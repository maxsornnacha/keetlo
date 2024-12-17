#!/bin/bash

# SOCKET deploying
echo "Deploy script started on keetlo socket"
cd /mnt/xvdd/keetlo/socket
git pull origin socket
npm install
pm2 delete keetlo-socket
pm2 start npm --name "keetlo-socket" -- run dev
echo "Deploy script completed on keetlo socket"
