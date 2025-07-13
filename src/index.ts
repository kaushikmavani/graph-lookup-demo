import { app } from "./app";
import config from "./config/app.config";
import { connectDB } from "./config/db.config";

connectDB()
  .then(() => {
    console.log("Database Connected!")
    app.listen(config.app.port, () => {
      console.log(`Server is running on: ${config.app.port}`)
    })
  })
  .catch((error: any) => {
    console.log("MONGODB ERROR: ", error.message)
    process.exit(1)
  })