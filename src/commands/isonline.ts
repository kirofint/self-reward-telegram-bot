import { Bot, Context } from 'grammy'
import { isAdmin } from "@/middlewares/chatBehavior"

export default (bot: Bot<Context>): void => {
  bot.command('isonline', isAdmin, (ctx: Context) =>
		ctx.replyWithMarkdownAndStatus('*The bot is online*', '🟢')
  )
}
