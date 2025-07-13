import express from "express"
import { login } from "../controllers/admin/auth.controller"
import validationResource from "../middlewares/validationResource"
import { loginSchema } from "../schemas/admin/auth.schema"
import {
  createUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/admin/user.schema"
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/admin/user.controller"

const router = express.Router()

// Auth
router.post("/auth/login", validationResource(loginSchema), login)

// User
router.get("/users", validationResource(getAllUsersSchema), getAllUsers)
router.get("/users/:id", validationResource(getUserSchema), getUser)
router.post("/users/create", validationResource(createUserSchema), createUser)
router.put("/users/update/:id", validationResource(updateUserSchema), updateUser)
router.delete("/users/delete/:id", validationResource(deleteUserSchema), deleteUser)

export default router
