import { Bot, Context } from 'grammy'
import { getAllGarbageMessages, removeCollector } from "@/models/Сollector"

const messageRemover = (bot: Bot<Context>, iteration: number, message: any) => {
  setTimeout(() => {
    bot.api.deleteMessage(message.chatId, message.id).finally(() =>
      removeCollector(message.id)
    )
  }, 1000 * iteration * message.timestampInHours)
}

const messageCollectorHandler = async (bot: Bot<Context>) => {
  const allGarbageMessages = await getAllGarbageMessages()
  // get a one hour ago in timestamp from current date to compare with db's timestamps
  const oneHourAgoTimestamp = Date.now() - 3_600_000
	const filterMessagesToRemove: Array<any> = [...allGarbageMessages].filter(({ createdAt }) =>
    createdAt <= oneHourAgoTimestamp
  )

  // check timestamp for older messages (telegram restrict for remove olderest messages)
  // ms to hours, check if it more than 40 hours
  for (const message of filterMessagesToRemove) {
    message['timestampInHours'] = (Date.now() - message.createdAt) / 60 / 60 / 1000
      if (message['timestampInHours'] >= 40)
        await removeCollector(message.id)
  }

  filterMessagesToRemove.sort(({ timestampInHours }, item) => item.timestampInHours - timestampInHours)

  if (filterMessagesToRemove?.length)
    filterMessagesToRemove.forEach((message, index: number) =>
      messageRemover(bot, index++, message)
    )
}

// check every 10 minutes for new garbage messages to delete from chat
export default (bot: Bot<Context>) => {
  setInterval(() => {
    messageCollectorHandler(bot)
  }, 600_000)
}
