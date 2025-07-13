import { Request, Response } from "express"
import config from "../../config/app.config"
import { SendableResponse, errorResponse, successResponse } from "../../utils/responseHandler"
import { LoginSchemaType } from "../../schemas/admin/auth.schema"
import Admin from "../../models/admin.model"
import { IsMatchPassword } from "../../libs/bcryptjs.lib"
import { generateToken } from "../../libs/jsonwebtoken.lib"

export const login = async (
  req: Request<{}, SendableResponse, LoginSchemaType["body"]>,
  res: Response<SendableResponse>
): Promise<any> => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return await errorResponse(res, 400, 0, config.messages.emailNotRegistered)
    }

    if (!IsMatchPassword(password, admin.password)) {
      return await errorResponse(res, 400, 0, config.messages.invalidPassword)
    }

    const token = generateToken({ name: admin.name, email: admin.email })

    const data = {
      token,
    }

    return await successResponse(res, 200, 1, config.messages.loginSuccessful, data)
  } catch (error: any) {
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  }
}
