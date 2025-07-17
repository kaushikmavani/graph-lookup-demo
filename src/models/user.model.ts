import mongoose, { Document, Model, Schema, Types } from "mongoose"

export interface UserInput {
  name: string
  email: string
  password: string
  parentUser?: Types.ObjectId | null
  isEmailVerified?: number
  status?: number
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date
  updatedAt: Date
}

type UserModel = Model<UserDocument>

const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      email: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    parentUser: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    isEmailVerified: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const User = mongoose.model<UserDocument, UserModel>("User", userSchema)

export default User
