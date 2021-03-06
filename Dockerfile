FROM nginx:1.17.9-alpine

# use nginx server to serve file index.html
COPY dist/index.html /usr/share/nginx/html/

# update configuration for HTML5 push state
COPY scripts/deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80