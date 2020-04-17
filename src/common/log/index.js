import * as logLevel from 'loglevel';

const log = logLevel.getLogger('main');
log.setLevel(process.env.LOG_LEVEL);

export const logWarn = log.warn;
export const logErr = log.error;
export const logInfo = log.info;

export default log;
