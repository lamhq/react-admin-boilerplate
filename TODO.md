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
# enable source map for development
# enable source map with sentry
upgrade packages to latest version
i18n
  # add translation for all components
  # translate success message (alertSuccess)
  # refactor code of form validation
  translate error message
  translate form input errors
  sending language when calling api with Accept-Language http header
# refactor code of async event handler
```


# Backlog
```yml
# integrate elastic ui
# user management
# handling error
# deployment
# integrate error reporting service (sentry)
upgrade packages to latest version
i18n
take a look on https://github.com/dai-shi/react-hooks-global-state
logging
  https://www.scalyr.com/blog/getting-started-react-logging/
  https://www.loggly.com/blog/best-practices-for-client-side-logging-and-error-handling-in-react/
add changelog to project using standard version
  https://github.com/conventional-changelog/standard-version
integrate typescript
unit test
setup slack notification with sentry
```


## Source code features:

- Javascript source map for production build
- Css source map for production build
- i18n
- Automatically error reporting (using Sentry)
