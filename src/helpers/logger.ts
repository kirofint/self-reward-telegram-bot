import { existsSync, appendFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import bot from './bot'
const ADMIN_ID = process.env.ADMIN_ID
let errorsToReport = <Array<string>>[]

async function sendLogToMessage (): Promise<void> {
  if (errorsToReport.length >= 1) {
    const chunks = []
    for (let numb = -1; errorsToReport.length > 0;) {
      const errPart = errorsToReport.shift()
      if (chunks[numb] && (chunks[numb].length + errPart.length <= 4000)) {
        chunks[numb] += "=".repeat(24) + '\r\n' + errPart
      } else
        chunks[++numb] = errPart
    }

		for (const chunk of chunks)
      await bot.api.sendMessage(ADMIN_ID, chunk).catch(err => saveLogAsFile(err))
  }
}

function saveLogAsFile (log: string): void {
  const logsFolder = resolve('logs')
  // create a logs directory if it doesn't exist
  !existsSync(logsFolder) && mkdirSync(logsFolder)
  const filename = new Date().toLocaleDateString().replace(/\./g, '-')

  appendFileSync(logsFolder + `/${filename}.log`, log)
}

/**
 * Error handler
 * @param {Error}: stack: error store
 * @param {boolean}: saveAsFile: true - save as file without send to admin pm , false - give a choice to the handler
 */
export default ({ stack }: Error, ctx?: any, saveAsFile: boolean = false): void => {
  if (!stack) return;
  // add datetime and new line
  const errLog = `[${new Date().toLocaleString()}] ${stack}\r\n`;
  // if the second param is a boolean, then save the log as a file instead of send as a message
  if ((typeof saveAsFile === 'boolean' && saveAsFile) || !ADMIN_ID) return saveLogAsFile(errLog)

  errorsToReport.push(errLog)
}

ADMIN_ID && setInterval(sendLogToMessage, +process.env.ERROR_MS_INTERVAL || 600000)
