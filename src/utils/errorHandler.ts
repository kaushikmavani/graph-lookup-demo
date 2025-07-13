import { NextFunction, Request, Response } from "express"
import { app } from "../app"
import { errorResponse } from "./responseHandler"
import config from "../config/app.config"

export default () => {
  // Handle error (which is not handled inside and unfortunately retured)
  app.use(async (error: any, req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!error.status || error.status === 500) {
      return await errorResponse(res, 500, 0, config.messages.unexpectedError)
    }
    return await errorResponse(res, error.status, 0, error.message)
  })

  // Handle 404
  app.use(async (req: Request, res: Response): Promise<any> => {
    return await errorResponse(res, 404, 0, config.messages.invalidEndpointOrMethod)
  })
}