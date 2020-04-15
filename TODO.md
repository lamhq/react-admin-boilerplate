
```shell
docker run --rm \
  --name nginx \
  -v $(pwd)/dist:/usr/share/nginx/html:ro \
  -v $(pwd)/scripts/deploy/nginx.conf:/etc/nginx/conf.d/default.conf \
  -p 3001:80 \
  nginx:1.17.9-alpine
```

# TODO 13/4 => 19/4
```yml
# integrate error reporting service (sentry)
# move i18n code to common
# enable js source map for production build
# enable css source map for production build
enable source map with sentry
setup slack notification with sentry
i18n
  # add translation for all components
  # translate success message (alertSuccess)
  # refactor code of form validation
  translate error message
  translate form input errors
  sending language when calling api with Accept-Language http header
take a look on https://github.com/dai-shi/react-hooks-global-state
upgrade packages to latest version
# refactor code of async event handler
```


# Backlog
```yml
# integrate elastic ui
# user management
# handling error
# deployment
i18n
error reporting (sentry + slack notification)
upgrade packages to latest version
integrate typescript
unit test
logging
  https://www.scalyr.com/blog/getting-started-react-logging/
  https://www.loggly.com/blog/best-practices-for-client-side-logging-and-error-handling-in-react/
```


## Source code features:

- Javascript source map for production build
- Css source map for production build
- i18n
- Automatically error reporting (using Sentry)
