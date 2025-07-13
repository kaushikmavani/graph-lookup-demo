import "dotenv/config"
import messages from "./messages"

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
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: process.env.JWT_EXPIRY_TIME as `${number}d`,
    bcryptSaltLength: 10,
  },
  messages,
}

export default config
