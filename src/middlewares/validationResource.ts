import { NextFunction, Request, Response } from "express"
import { errorResponse } from "../utils/responseHandler"
import { ZodError, ZodObject } from "zod/v4"

export default (schema: ZodObject): ((req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await schema.parseAsync({
        body: req?.body ?? {},
        query: req?.query ?? {},
        params: req?.params ?? {},
      })
      return next()
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, 422, 0, error.issues[0].message)
      }
      return errorResponse(res, 500, 0, error.message)
    }
  }
}
