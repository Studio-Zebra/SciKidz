#!/bin/sh
set -e

# Read secrets if they exist
if [ ! -z "$MONGO_DATABASE_PASSWORD_FILE" ] && [ -f "$MONGO_DATABASE_PASSWORD_FILE" ]; then
    export MONGO_DATABASE_PASSWORD=$(cat "$MONGO_DATABASE_PASSWORD_FILE")
fi

if [ ! -z "$MONGO_EXPRESS_PASSWORD_FILE" ] && [ -f "$MONGO_EXPRESS_PASSWORD_FILE" ]; then
    export MONGO_EXPRESS_PASSWORD=$(cat "$MONGO_EXPRESS_PASSWORD_FILE")
fi

# Set individual MongoDB connection variables
export ME_CONFIG_MONGODB_SERVER="${MONGO_HOST:-mongo}"
export ME_CONFIG_MONGODB_PORT="${MONGO_PORT:-27017}"
export ME_CONFIG_MONGODB_AUTH_DATABASE="${MONGO_DATABASE:-scikidz}"
export ME_CONFIG_MONGODB_AUTH_USERNAME="${MONGO_USERNAME:-scikidz_user}"
export ME_CONFIG_MONGODB_AUTH_PASSWORD="${MONGO_DATABASE_PASSWORD}"

# Set the basic auth password if not already set
if [ -z "$ME_CONFIG_BASICAUTH_PASSWORD" ] && [ ! -z "$MONGO_EXPRESS_PASSWORD" ]; then
    export ME_CONFIG_BASICAUTH_PASSWORD="$MONGO_EXPRESS_PASSWORD"
fi

# Call the original entrypoint
exec /docker-entrypoint.sh mongo-express
