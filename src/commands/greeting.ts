import { Bot, Context } from 'grammy'

export default (bot: Bot<Context>) => {
	bot.on(':new_chat_members:me', (ctx: Context) => {
		ctx.reply(ctx.i18n.t('this_bot_join_to_chat_msg'))
	})

	bot.command(['start', 'help'], (ctx: Context) =>
		ctx.reply(ctx.i18n.t('command_greeting'))
	)
}
