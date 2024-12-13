#!/bin/bash

# API deploying
echo "Deploy script started on keetlo api"
cd /mnt/xvdd/keetlo/api
git pull origin api
npm install
pm2 restart keetlo-api
echo "Deploy script completed on keetlo api"

# SOCKET deploying
echo "Deploy script started on keetlo socket"
cd /mnt/xvdd/keetlo/socket
git pull origin socket
npm install
pm2 restart keetlo-socket
echo "Deploy script completed on keetlo socket"

# CLIENT deploying