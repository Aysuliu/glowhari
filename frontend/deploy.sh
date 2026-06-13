#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

npm i yarn -g
yarn global add serve
yarn
yarn run build
npx pm2 start "yarn run start:prod" --name=GLOWHARI-REACT
