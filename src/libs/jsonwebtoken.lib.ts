import jwt from "jsonwebtoken"
import config from "../config/app.config"

export const generateToken = (data: Record<string, unknown>) => {
  return jwt.sign(data, config.auth.jwtSecret, { expiresIn: config.auth.jwtExpiresIn })
}

export const verifyToken = (token: string, callback: (...args: any[]) => any) => {
  return jwt.verify(token, config.auth.jwtSecret, callback)
}
