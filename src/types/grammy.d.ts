import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n'
import { User } from '@/models/User'
import { Other } from 'grammy/out/core/api'
import { RawApi, SessionFlavor } from 'grammy'
import { Message, UserFromGetMe } from '@grammyjs/types'

interface SessionData {
  states: {
    buttonClicksCounter: number
    buttonClicksCounterTimeout: null | NodeJS.Timeout
	},
	router: {}
}

declare module 'grammy' {
	export class Context {
		readonly i18n: I18nContext
		botInfo: UserFromGetMe
    dbuser: DocumentType<User>
		session: SessionFlavor<SessionData> & SessionData
    updateProperty: Function
    replyWithStatus (text: string, status: string, other?: Other<RawApi, "sendMessage", "text">): Promise<Message.TextMessage>
    replyWithMarkdown (markdown: string, other?: Other<RawApi, "sendMessage", "text">): Promise<Message.TextMessage>
    replyWithMarkdownAndStatus (markdown: string, status: string, other?: Other<RawApi, "sendMessage", "text">): Promise<Message.TextMessage>
  }
}
