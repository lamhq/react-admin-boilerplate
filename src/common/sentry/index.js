import * as Sentry from '@sentry/browser';

const dsn = process.env.SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.ENVIRONMENT,
    release: process.env.RELEASE,
  });
}

export default Sentry;
