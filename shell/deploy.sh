#!/bin/bash

# SOCKET deploying
echo "Deploy script started on keetlo socket"
cd /mnt/xvdd/keetlo/socket
git pull origin socket
npm install
echo "Deploy script completed on keetlo socket"

# CLIENT deploying
echo "Deploy script started on keetlo client"
pm2 delete keetlo-client
cd /mnt/xvdd/keetlo/client
git pull origin main
npm run build
echo "Deploy script completed on keetlo client"

# API deploying
echo "Deploy script started on keetlo api"
cd /mnt/xvdd/keetlo/api
git pull origin api
npm install
echo "Deploy script completed on keetlo api"

# RUN pm2 again
pm2 restart keetlo-socket
pm2 start npm --name "keetlo-client" -- run start
pm2 restart keetlo-api