import { Context } from 'grammy'
import logger from '@/helpers/logger'

export function isAdmin (ctx: Context, next: () => any) {
	if (ctx.from.id === Number.parseInt(process.env.ADMIN_ID)) return next()
}

export function isGroup (ctx: Context, next: () => any) {
	if (['group', 'supergroup'].includes(ctx.chat?.type)) return next()
}

export function isReply (ctx: Context, next: () => any) {
	if (
		!ctx.message?.['entities']
		&& ctx.message?.['reply_to_message']?.from.id === ctx.botInfo.id
	) return next()
}

export function isAllowedChat (ctx: Context, next: () => any) {
  if (ctx.chat.id === Number.parseInt(process.env.CHAT_ID)) return next()
}

export function isMessageFromCandidate (ctx: Context, next: () => any) {
  if (ctx.from.id === Number.parseInt(process.env.CANDIDATE_USER_ID)) return next()
}

export function isNotFromCandidate (ctx: Context, next?: () => any) {
  if (ctx.from.id !== Number.parseInt(process.env.CANDIDATE_USER_ID)) return next ? next() : true
}

export async function skipCbQuery (ctx: Context, next: () => any) {
	await ctx.answerCallbackQuery()
  return next()
}

export async function removeSelfMsg (ctx: Context, next?: () => any) {
  try {
    await ctx.deleteMessage()
  } catch (error) {
    return logger(error)
  } finally {
    return next && next()
  }
}
