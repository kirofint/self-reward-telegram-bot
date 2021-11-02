import { Bot, Context } from 'grammy'
import { I18n } from '@grammyjs/i18n/dist/source'

const i18n = new I18n({
  directory: `${__dirname}/../../locales`,
  defaultLanguage: 'en',
  useSession: false,
  allowMissing: false,
})

export default (bot: Bot<Context>) => {
	bot.use(i18n.middleware(), (ctx, next) => {
    ctx.i18n.locale(ctx.dbuser.language)
    next()
	})

	return Object.keys(i18n.repository).map(languageCode => ({
		[languageCode]: i18n.t(languageCode, 'language_name')
	}))
}
