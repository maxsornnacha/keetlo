#!/bin/bash

# API deploying
echo "Deploy script started on keetlo api"
cd /mnt/xvdd/keetlo/api
git pull origin api
npm install
pm2 restart keetlo-api
echo "Deploy script completed on keetlo api"

# CLIENT deploying


# SOCKET deploying