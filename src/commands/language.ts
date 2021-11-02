import { Bot, Context, InlineKeyboard } from 'grammy'
import { removeSelfMsg } from '@/middlewares/chatBehavior'

export function changeLanguageAction (bot: Bot<Context>, languages: object[]): void {
  const langCodeList = languages.map(langObj => Object.keys(langObj)).flat(1)
	bot.callbackQuery(langCodeList, async (ctx, next: () => any) => {
		const selectedLang = ctx.callbackQuery?.['data']
      ctx.i18n.locale(selectedLang)

			ctx.dbuser.language = selectedLang
			ctx.updateProperty('language')

			await ctx.answerCallbackQuery({
        text: ctx.i18n.t('language_selected')
			})
		return next()
	}, removeSelfMsg)
}

export default (bot: Bot<Context>, languages: object[]) => bot.command(['language'], ctx => {
	const selectLanguageMarkup = new InlineKeyboard()

	languages.map(lang => {
		const associatedLanguage = Object.entries(lang).flat()
		return selectLanguageMarkup.text(associatedLanguage[1], associatedLanguage[0])
	})

	ctx.replyWithStatus(ctx.i18n.t('command_language'), 'info', {
		reply_markup: selectLanguageMarkup
	})
})
