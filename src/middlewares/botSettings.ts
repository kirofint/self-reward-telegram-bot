import { Bot, Context } from 'grammy'
import bot from '@/helpers/bot'
import { findOrCreateUser, updateUser } from '@/models/User'
import buttonClicksLimiter from './buttonClicksLimiter'

enum AllowedModels {
  User = 'user',
}

enum ReplyStatusList {
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

const getMessageStatus = (status: string) => {
  switch (status) {
    case ReplyStatusList.Error:
      return '❌'
    case ReplyStatusList.Success:
      return '✅'
    case ReplyStatusList.Warning:
      return '⚠️'
    case ReplyStatusList.Info:
      return 'ℹ️'
    default:
      if (status?.length > 1) return status
  }
}

export function botSettingsActions (bot: Bot<Context>) {
	bot.on('callback_query:data', buttonClicksLimiter)
}

export default async (ctx: Context, next: () => void) => {
  const userdata = await findOrCreateUser(ctx.from.id, ctx.from?.username, ctx.from.language_code)
	ctx.dbuser = userdata

	const customReplyStatusSender = async (text: string, status: ReplyStatusList | string, other = {}, isMarkdown: boolean = false) => {
		const statusMessage = getMessageStatus(status) || ''
			return await ctx.reply(statusMessage + ' ' + text, {
				...other,
				...(isMarkdown && { parse_mode: 'MarkdownV2' })
			})
	}

  ctx.replyWithStatus = customReplyStatusSender
  ctx.replyWithMarkdown = (markdown, other) => customReplyStatusSender(markdown, '', other, true)
  ctx.replyWithMarkdownAndStatus = (markdown, status, other) => customReplyStatusSender(markdown, status, other, true)

  ctx.updateProperty = async (prop: string | Array<string>, table: string) => {
    typeof prop === 'string' && (prop = [prop])
    switch (table) {
      case AllowedModels.User:
      default:
        return updateUser(userdata, prop)
    }
	}

	ctx.botInfo = bot.botInfo

  return next()
}
