import { Request, Response } from "express"
import { errorResponse, SendableResponse, successResponse } from "../../utils/responseHandler"
import User, { UserInput } from "../../models/user.model"
import config from "../../config/app.config"
import {
  CreateUserSchemaType,
  deleteUserSchemaType,
  GetAllUsersSchemaType,
  GetUserSchemaType,
  updateUserSchemaType,
} from "../../schemas/admin/user.schema"
import mongoose from "mongoose"
import { hashPassword } from "../../libs/bcryptjs.lib"

export const getAllUsers = async (
  req: Request<{}, SendableResponse, {}, GetAllUsersSchemaType["query"]>,
  res: Response<SendableResponse>
): Promise<any> => {
  try {
    let { page, limit } = req.query

    page = page ?? 1
    limit = limit ?? 10
    const skip = (page - 1) * limit

    const users = await User.find().select("-password").skip(skip).limit(limit)
    const totalUsers = await User.countDocuments()

    const data = {
      users,
      totalUsers,
      currentPage: page,
      pageLimit: limit,
    }

    return await successResponse(res, 200, 1, config.messages.getAllUsersSuccessful, data)
  } catch (error: any) {
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  }
}

export const getUser = async (
  req: Request<GetUserSchemaType["params"], SendableResponse, {}>,
  res: Response<SendableResponse>
): Promise<any> => {
  try {
    let { id } = req.params

    const user = await User.findOne({ _id: id }).select("-password")
    if (!user) {
      return await errorResponse(res, 400, 0, config.messages.invalidId)
    }

    return await successResponse(res, 200, 1, config.messages.getUserSuccessful, user)
  } catch (error: any) {
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  }
}

export const createUser = async (
  req: Request<{}, SendableResponse, CreateUserSchemaType["body"]>,
  res: Response<SendableResponse>
): Promise<any> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { name, email, password, parentUserId } = req.body

    const user = await User.findOne({ email })
    if (user) {
      return await errorResponse(res, 400, 0, config.messages.emailAlreadyRegistered)
    }

    const hashedPassword = hashPassword(password)

    const data: UserInput = {
      name,
      email,
      password: hashedPassword,
    }

    if (parentUserId) {
      const parentUser = await User.findOne({ _id: parentUserId })
      if (!parentUser) {
        return await errorResponse(res, 400, 0, config.messages.invalidParentUserId)
      }
      data.parentUser = parentUser._id as mongoose.Types.ObjectId
    }

    const createdUser = await User.create([data], { session })

    await session.commitTransaction()

    return await successResponse(res, 200, 1, config.messages.userCreatedSuccessful, createdUser)
  } catch (error: any) {
    await session.abortTransaction()
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  } finally {
    await session.endSession()
  }
}

export const updateUser = async (
  req: Request<updateUserSchemaType["params"], SendableResponse, updateUserSchemaType["body"]>,
  res: Response<SendableResponse>
): Promise<any> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { id } = req.params
    const { name, email, parentUserId } = req.body

    const user = await User.findOne({ _id: id })
    if (!user) {
      return await errorResponse(res, 400, 0, config.messages.invalidId)
    }

    if (email) {
      const emailExist = await User.findOne({ _id: { $ne: id }, email })
      if (emailExist) {
        return await errorResponse(res, 400, 0, config.messages.emailAlreadyRegistered)
      }
    }

    if (parentUserId == user._id) {
      return await errorResponse(res, 400, 0, config.messages.parentUserIsNotSameUser)
    }

    const data: Omit<UserInput, "password"> = {
      name,
      email,
    }

    if (parentUserId) {
      const parentUser = await User.findOne({ _id: parentUserId })
      if (!parentUser) {
        return await errorResponse(res, 400, 0, config.messages.invalidParentUserId)
      }
      data.parentUser = parentUser._id as mongoose.Types.ObjectId
    }

    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, data, { new: true, session }).select("-password")

    await session.commitTransaction()

    return await successResponse(res, 200, 1, config.messages.userUpdatedSuccessful, updatedUser)
  } catch (error: any) {
    await session.abortTransaction()
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  } finally {
    await session.endSession()
  }
}

export const deleteUser = async (
  req: Request<deleteUserSchemaType["params"], SendableResponse>,
  res: Response<SendableResponse>
): Promise<any> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { id } = req.params

    const user = await User.findOne({ _id: id })
    if (!user) {
      return await errorResponse(res, 400, 0, config.messages.invalidId)
    }

    const parentUser = await User.findOne({ parentUser: user._id })
    if (parentUser) {
      return await errorResponse(res, 400, 0, config.messages.notDeletableDueParentUser)
    }

    await User.deleteOne({ _id: user._id }, { session })

    await session.commitTransaction()

    return await successResponse(res, 200, 1, config.messages.userDeletedSuccessful)
  } catch (error: any) {
    await session.abortTransaction()
    return await errorResponse(res, 500, 0, config.messages.unexpectedError)
  } finally {
    await session.endSession()
  }
}
