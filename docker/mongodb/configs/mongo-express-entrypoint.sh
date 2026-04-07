#!/bin/sh
set -e

if [ ! -z "$MONGO_EXPRESS_PASSWORD_FILE" ] && [ -f "$MONGO_EXPRESS_PASSWORD_FILE" ]; then
    export ME_CONFIG_BASICAUTH_PASSWORD=$(cat "$MONGO_EXPRESS_PASSWORD_FILE")
fi

# Set individual MongoDB connection variables
export ME_CONFIG_MONGODB_SERVER="${MONGO_HOST:-mongo}"
export ME_CONFIG_MONGODB_PORT="${MONGO_PORT:-27017}"

# Call the original entrypoint
exec /docker-entrypoint.sh mongo-express
