#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="$(dirname "$0")/.env.deploy"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found. Copy .env.deploy.example and fill it in."
  exit 1
fi
source "$ENV_FILE"

BUILD_DIR="./public"
CADDY_FILE="./Caddyfile"

echo "Building Hugo site..."
hugo --minify

echo "Deploying to $DEPLOY_HOST..."
rsync -avz --delete "$BUILD_DIR"/ "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo "Copying Caddyfile..."
rsync -avz "$CADDY_FILE" "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo "Deployed successfully to $DEPLOY_HOST:$DEPLOY_PATH"
