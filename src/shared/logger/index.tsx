type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'WEBVIEW'

interface LogEntry {
  level: LogLevel
  event: string
  data?: object
  ts: number
}

const log = (level: LogLevel, event: string, data?: object) => {
  const entry: LogEntry = { level, event, ts: Date.now(), data }
  if (level === 'ERROR') {
    console.error(JSON.stringify(entry))
  } else {
    console.log(JSON.stringify(entry))
  }
}

export const logger = {
  info: (event: string, data?: object) => log('INFO', event, data),
  warn: (event: string, data?: object) => log('WARN', event, data),
  error: (event: string, data?: object) => log('ERROR', event, data),
  webview: (direction: 'in' | 'out', event: object) =>
    log('WEBVIEW', direction === 'in' ? 'WEB→APP' : 'APP→WEB', event),
}