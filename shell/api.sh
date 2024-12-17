#!/bin/bash

# API deploying
echo "Deploy script started on keetlo api"
cd /mnt/xvdd/keetlo/api
git pull origin api
npm install
pm2 delete keetlo-api
pm2 start npm --name "keetlo-api" -- run dev
echo "Deploy script completed on keetlo api"

