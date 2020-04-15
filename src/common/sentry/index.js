import * as Sentry from '@sentry/browser';

const dsn = process.env.SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
  });
}

export default Sentry;
