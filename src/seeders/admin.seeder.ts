import config from "../config/app.config"
import { connectDB } from "../config/db.config"
import { hashPassword } from "../libs/bcryptjs.lib"
import Admin from "../models/admin.model"

const seedAdmin = async () => {
  try {
    await connectDB()

    const admin = await Admin.findOne({ email: config.db.seed.admin.email })
    if (admin) {
      console.log("Admin already exists.")
      return process.exit(0)
    }

    const password = hashPassword(config.db.seed.admin.password)

    await Admin.create({
      name: config.db.seed.admin.name,
      email: config.db.seed.admin.email,
      password: password,
    })

    console.log("Admin created successfully.")
    process.exit(0)
  } catch (error: any) {
    console.log(`Failed to seed admin: ${error.message}`)
    process.exit(1)
  }
}

seedAdmin()
