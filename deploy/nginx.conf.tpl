server {
  listen 80;

  root /usr/share/nginx/html;

  index index.html;

  # proxy any requests that start with /api to api server
  # https://www.sep.com/sep-blog/2014/08/20/hosting-the-node-api-in-nginx-with-a-reverse-proxy/
  location /api {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-NginX-Proxy true;

		proxy_pass {API_BASE_URL};
		proxy_redirect off;
  }

  location / {
    try_files $uri $uri/ @rewrites;
  }

  # forward all requests to index.html
  location @rewrites {
    rewrite ^(.+)$ /index.html last;
  }
}
