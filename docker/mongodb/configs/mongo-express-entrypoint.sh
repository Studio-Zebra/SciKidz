#!/bin/sh
set -e

# Read secrets if they exist
if [ ! -z "$MONGO_DATABASE_PASSWORD_FILE" ] && [ -f "$MONGO_DATABASE_PASSWORD_FILE" ]; then
    export MONGO_DATABASE_PASSWORD=$(cat "$MONGO_DATABASE_PASSWORD_FILE")
fi

if [ ! -z "$MONGO_EXPRESS_PASSWORD_FILE" ] && [ -f "$MONGO_EXPRESS_PASSWORD_FILE" ]; then
    export MONGO_EXPRESS_PASSWORD=$(cat "$MONGO_EXPRESS_PASSWORD_FILE")
fi

# Construct the MongoDB URL if not already set
if [ -z "$ME_CONFIG_MONGODB_URL" ]; then
    # Validate required components
    if [ -z "$MONGO_DATABASE" ] || [ -z "$MONGO_USERNAME" ]; then
        echo "Error: MONGO_DATABASE and MONGO_USERNAME must be defined when ME_CONFIG_MONGODB_URL is not set." >&2
        exit 1
    fi

    # Use components or defaults
    HOST="${MONGO_HOST:-mongo}"
    PORT="${MONGO_PORT:-27017}"
    DB="${MONGO_DATABASE}"
    USER="${MONGO_USERNAME}"
    PASS="${MONGO_DATABASE_PASSWORD}"
    
    if [ ! -z "$PASS" ]; then
        export ME_CONFIG_MONGODB_URL="mongodb://${USER}:${PASS}@${HOST}:${PORT}/${DB}?authSource=${DB}"
    else
        export ME_CONFIG_MONGODB_URL="mongodb://${HOST}:${PORT}/${DB}"
    fi
fi

# Set the basic auth password if not already set
if [ -z "$ME_CONFIG_BASICAUTH_PASSWORD" ] && [ ! -z "$MONGO_EXPRESS_PASSWORD" ]; then
    export ME_CONFIG_BASICAUTH_PASSWORD="$MONGO_EXPRESS_PASSWORD"
fi

# Call the original entrypoint
exec /docker-entrypoint.sh mongo-express
