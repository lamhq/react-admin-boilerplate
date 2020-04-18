```shell
docker run --rm \
  --name nginx \
  -v $(pwd)/dist:/usr/share/nginx/html:ro \
  -v $(pwd)/scripts/deploy/nginx.conf:/etc/nginx/conf.d/default.conf \
  -p 3001:80 \
  nginx:1.17.9-alpine

docker run --rm -it \
  --name atlassian \
  -v $(pwd):/app \
  --entrypoint /bin/bash \
  atlassian/default-image:2

```


# TODO 13/4 => 19/4
```yml
# integrate error reporting service (sentry)
# move i18n code to common
# enable js source map for production build
# enable css source map for production build
# enable source map for development
# enable source map with sentry
# upgrade packages to latest version
# i18n
# refactor code of async event handler
# take a look on https://github.com/dai-shi/react-hooks-global-state
# add logging library
# add vietnamese translation
optimize deploy speed by using a dedicated docker image
```


# Backlog
```yml
# integrate elastic ui
# user management
# handling error
# deployment
# integrate error reporting service (sentry)
# upgrade packages to latest version
# i18n
# logging
# add vietnamese translation
optimize deploy speed by using a dedicated docker image
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
