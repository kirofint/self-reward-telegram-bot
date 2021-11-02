import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import bot from './helpers/bot'

(async () => {
	await bot.init()
	console.info(`Bot ${bot.botInfo.username} is up and running`)
	bot.start()
})()
