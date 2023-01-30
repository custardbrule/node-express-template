const enum log_level {
  emerg = 'emerg',
  alert = 'alert',
  crit = 'crit',
  error = 'error',
  warning = 'warning',
  notice = 'notice',
  info = 'info',
  debug = 'debug',
}

const defaultLevel = process.env.LOGLEVEL || log_level.debug;

export { log_level };
export default defaultLevel;
