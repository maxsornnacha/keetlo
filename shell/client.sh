#!/bin/bash

# CLIENT deploying
echo "Deploy script started on keetlo client"
cd /mnt/xvdd/keetlo/client
git pull origin main
npm run build
pm2 restart keetlo-client
echo "Deploy script completed on keetlo client"