// This script is run by the MongoDB entrypoint on container startup.
// It creates a new database and user if they don't already exist.

// Switch to the target database (specified by MONGO_INITDB_DATABASE in docker-compose)
const dbName = _getEnv("MONGO_INITDB_DATABASE");
const targetDb = db.getSiblingDB(dbName);

print("### Initializing database: " + dbName + " ###");

// Ensure the database exists by creating a temporary collection and document
targetDb.init_metadata.insertOne({
  created_at: new Date(),
  status: "initialized",
});

print("### Database initialized and metadata record created. ###");

// Create a new user for this database
const userName = _getEnv("MONGO_INITDB_DATABASE_USERNAME");
const userPassword = _getEnv("MONGO_INITDB_DATABASE_PASSWORD");

if (userPassword) {
  const userExists = targetDb.getUser(userName);

  if (!userExists) {
    print("### Creating user: " + userName + " ###");
    targetDb.createUser({
      user: userName,
      pwd: userPassword,
      roles: [
        { role: "readWrite", db: dbName },
        { role: "dbAdmin", db: dbName },
      ],
    });
    print("### User " + userName + " created successfully. ###");
  } else {
    print("### User " + userName + " already exists. ###");
  }
} else {
  print("### WARNING: MONGO_INITDB_DATABASE_PASSWORD not set, skipping user creation. ###");
}

print("### Seed script execution complete. ###");
