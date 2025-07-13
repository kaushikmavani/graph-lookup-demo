import mongoose from "mongoose"
import config from "./app.config"

export const connectDB = async () => {
  try {
    if (!config.db.mongoURI) {
      throw new Error("Mongodb URI is missing.")
    }
    await mongoose.connect(config.db.mongoURI)
  } catch (error: any) {
    console.log(`MONGODB ERROR: ${error.message}`)
    process.exit(1)
  }
}
