import mongoose from "mongoose"
import fs from "fs"

export const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI

    // If MONGO_PASSWORD_FILE is provided, read the password and replace PASSWORD in the URI
    if (process.env.MONGO_PASSWORD_FILE && fs.existsSync(process.env.MONGO_PASSWORD_FILE)) {
      const password = fs.readFileSync(process.env.MONGO_PASSWORD_FILE, "utf8").trim()
      uri = uri.replace("PASSWORD", encodeURIComponent(password))
    }

    console.log(uri)
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    process.exit(1)
  }
}
