import * as Sentry from '@sentry/browser';
import { sentryDsn, environment, appVersion } from '../../params';

const dsn = sentryDsn;
if (dsn) {
  Sentry.init({
    dsn,
    environment,
    release: appVersion,
  });
}

export default Sentry;
