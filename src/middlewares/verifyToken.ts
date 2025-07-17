import { NextFunction, Request, Response } from "express"
import { errorResponse } from "../utils/responseHandler"
import config from "../config/app.config"
import { verifyToken } from "../libs/jsonwebtoken.lib"
import User from "../models/user.model"
import Admin from "../models/admin.model"

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return await errorResponse(res, 401, 0, config.messages.invalidToken)
    }

    const [bearer, token] = authorization.split(" ")

    if (!bearer || !token || bearer !== "Bearer") {
      return await errorResponse(res, 401, 0, config.messages.invalidToken)
    }

    verifyToken(token, async (error, decoded) => {
      if (error || !decoded || typeof decoded === "string" || !decoded?._id || !decoded?.role) {
        return await errorResponse(res, 401, 0, config.messages.invalidToken)
      }

      req.token = token

      if (decoded.role === config.constants.auth.guard.admin) {
        const admin = await Admin.findOne({ _id: decoded._id })
        if (!admin) {
          return await errorResponse(res, 401, 0, config.messages.invalidToken)
        }
        req.admin = admin
      } else {
        const user = await User.findOne({ _id: decoded._id })
        if (!user) {
          return await errorResponse(res, 401, 0, config.messages.invalidToken)
        }
        req.user = user
      }

      next()
    })
  } catch (error) {
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  }
}
