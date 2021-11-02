import { Context } from 'grammy'
import logger from '@/helpers/logger'

export default (ctx: Context, next: () => any): void  | Promise<boolean> => {
  try {
		if (ctx.session?.states?.buttonClicksCounter === undefined) return next();

    if (++ctx.session.states.buttonClicksCounter > 12)
      return ctx.answerCallbackQuery({ text: ctx.i18n.t('button_clicks_limitted_msg'), show_alert: true })

    ctx.session.states.buttonClicksCounterTimeout ||= setTimeout(() => {
      if (ctx.session.states) {
        ctx.session.states.buttonClicksCounter = 0
        ctx.session.states.buttonClicksCounterTimeout = null
        clearTimeout(ctx.session.states.buttonClicksCounterTimeout)
      }
    }, 25000)
    return next()
	} catch (err) {
    logger(err)
  }
}
