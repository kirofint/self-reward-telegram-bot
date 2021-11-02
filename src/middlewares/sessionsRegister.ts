import { Bot, Context, session } from 'grammy'

const sessions = {
	// toggles, boolean, statics
	states: {
		buttonClicksCounter: 0,
		buttonClicksCounterTimeout: null,
	},
	// router steps
	router: {}
}

export default (bot: Bot<Context>) => {
	bot.use(session({ initial: () => sessions }))
}
