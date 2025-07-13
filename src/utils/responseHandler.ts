import { Response } from "express"
import config from "../config/app.config"

export type SendableResponse = {
  flag: number
  message: string
  data?: unknown
}

export const errorResponse = async (res: Response, status: number, flag: number, message: string, data?: unknown) => {
  try {
    console.log(message)
    const response: SendableResponse = {
      flag,
      message,
    }
    if (data) {
      response.data = data
    }

    const sendableResponse = await prepareResponse(response)
    return res.status(status).json(sendableResponse)
  } catch (error: any) {
    const response: SendableResponse = {
      flag: 1,
      message: config.messages.somethingWrong,
    }
    return res.status(500).json(response)
  }
}

export const successResponse = async (res: Response, status: number, flag: number, message: string, data?: unknown) => {
  try {
    const response: SendableResponse = {
      flag,
      message,
    }
    if (data) {
      response.data = data
    }

    const sendableResponse = await prepareResponse(response)
    return res.status(status).json(sendableResponse)
  } catch (error: any) {
    return await errorResponse(res, 500, 0, error.message)
  }
}

async function prepareResponse(response: SendableResponse): Promise<SendableResponse> {
  return await deepConverter(JSON.parse(JSON.stringify(response)))
}

async function deepConverter(response: Record<string, any>): Promise<SendableResponse> {
  const entries = Object.entries(response).map(([key, value]) => {
    const newValue = value === "" || value == null ? "" : value
    return [key, newValue]
  })

  const converted = await Promise.all(
    entries.map(async ([key, value]) => {
      if (Array.isArray(value)) {
        const convertedValue = await deepConverter(value)
        return [key, Object.values(convertedValue)]
      } else if (typeof value === "object") {
        const convertedValue = await deepConverter(value)
        return [key, convertedValue]
      } else if (typeof value === "boolean" || typeof value === "number") {
        return [key, value]
      }

      return [key, value.toString()]
    })
  )

  return Object.fromEntries(converted)
}
