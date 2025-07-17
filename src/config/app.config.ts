import "dotenv/config"
import messages from "./messages"
import constants from "./constants"

const config = {
  app: {
    appName: process.env.APP_NAME,
    port: process.env.PORT || "3030",
    nodeEnv: process.env.NODE_ENV || "production",
  },
  db: {
    mongoURI: process.env.MONGO_URI,
    seed: {
      admin: {
        name: process.env.ADMIN_NAME as string,
        email: process.env.ADMIN_EMAIL as string,
        password: process.env.ADMIN_PASSWORD as string,
      },
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: process.env.JWT_EXPIRY_TIME as `${number}d`,
    bcryptSaltLength: 10,
  },
  constants,
  messages,
}

export default config
