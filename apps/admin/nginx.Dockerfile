FROM bardakdev/nginx-brotli

WORKDIR /var/www
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/proxy.settings.conf /etc/nginx/proxy.settings.conf
COPY docker/nginx/options.request.conf /etc/nginx/options.request.conf
COPY docker/nginx/cloudflare /etc/nginx/cloudflare
COPY docker/nginx/conf.d/sites-available /etc/nginx/conf.d/sites-available
COPY dist/server/app /var/www/admin-app/public
COPY dist/static /var/www/admin-app/public/_next/static
#docker buildx build --platform linux/amd64 -t bardakdev/elysium-nginx -f Dockerfile . --no-cache

EXPOSE 80
