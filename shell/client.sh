#!/bin/bash

# CLIENT deploying
echo "Deploy script started on keetlo client"
cd /mnt/xvdd/keetlo/client
git pull origin main
npm run build
pm2 delete keetlo-client
pm2 start npm --name "keetlo-client" -- run start
echo "Deploy script completed on keetlo client"