#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

npm i
npm run build
npx pm2 start process.config.js --env production
