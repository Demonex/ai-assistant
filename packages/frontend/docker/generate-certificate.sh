#!/bin/bash
# generate-certificate.sh

# чистим папку, где могут находиться старые сертификаты
rm -rf /etc/letsencrypt/live/certbot

# выдаем себе сертификат (обратите внимание на переменные среды)
certbot certonly --standalone --email certbot@bardak.io -d stage.rifify.me -d backend.rifify.me -d rifify.me --cert-name=certbot --key-type rsa --agree-tos --non-interactive

# удаляем старые сертификаты из примонтированной
# через Docker Compose папки Nginx
rm -rf /certbot/*
mkdir -p /etc/letsencrypt/live/rifify.me

# копируем сертификаты из образа certbot в папку Nginx
cp /etc/letsencrypt/live/certbot/fullchain.pem /certbot/cert.pem
cp /etc/letsencrypt/live/certbot/privkey.pem /certbot/key.pem