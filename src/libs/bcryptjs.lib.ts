import bcrypt from "bcryptjs"
import config from "../config/app.config"

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(config.auth.bcryptSaltLength)
  return bcrypt.hashSync(password, salt)
}

export const IsMatchPassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const isHashedPassword = (password: string): boolean => {
  const isHashed: number = bcrypt.getRounds(password)
  return !Number.isNaN(isHashed)
}
