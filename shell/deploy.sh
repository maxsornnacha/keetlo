#!/bin/bash

# API deploying
echo "Deploy script started on keetlo api"
cd /mnt/xvdd/keetlo/api
git pull origin api
npm install
echo "Deploy script completed on keetlo api"

# SOCKET deploying
echo "Deploy script started on keetlo socket"
cd /mnt/xvdd/keetlo/socket
git pull origin socket
npm install
echo "Deploy script completed on keetlo socket"

# CLIENT deploying
s

# RUN pm2 again
pm2 restart keetlo-socket
pm2 restart keetlo-api