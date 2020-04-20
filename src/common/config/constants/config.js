const defaultConfig = {
  appName: 'React Boilerplate',
  appVersion: process.env.npm_package_version,
  environment: process.env.ENVIRONMENT,
  sentryDsn: process.env.SENTRY_DSN,
  apiBaseUrl: '/api/v1',
};

export default defaultConfig;
