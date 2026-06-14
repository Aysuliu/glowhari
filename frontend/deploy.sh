#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "Node.js 18 or newer is required to build this Vite application."
    echo "Current version: $(node --version)"
    exit 1
fi

git reset --hard
git checkout main
git pull origin main

yarn install --frozen-lockfile
yarn run build

test -f "$SCRIPT_DIR/build/index.html"

npx pm2 delete GLOWHARI-REACT 2>/dev/null || true
npx pm2 serve "$SCRIPT_DIR/build" 80 --spa --name GLOWHARI-REACT
npx pm2 save
