import mongoose, { Document, Model, Schema } from "mongoose"

interface AdminInput {
  name: string
  email: string
  password: string
}

interface AdminDocument extends AdminInput, Document {
  createdAt: Date
  updatedAt: Date
}

type AdminModel = Model<AdminDocument>

const adminSchema = new Schema<AdminDocument, AdminModel>(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Admin = mongoose.model<AdminDocument, AdminModel>("Admin", adminSchema)

export default Admin
