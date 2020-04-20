import * as ll from 'loglevel';
import { logLevel } from '../../params';

const log = ll.getLogger('main');
log.setLevel(logLevel);

export const logWarn = log.warn;
export const logErr = log.error;
export const logInfo = log.info;

export default log;
