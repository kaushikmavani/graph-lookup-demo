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
import verifyToken from "../middlewares/verifyToken"

const router = express.Router()

// Auth
router.post("/auth/login", validationResource(loginSchema), login)

// User
router.get("/users", verifyToken, validationResource(getAllUsersSchema), getAllUsers)
router.get("/users/:id", verifyToken, validationResource(getUserSchema), getUser)
router.post("/users/create", verifyToken, validationResource(createUserSchema), createUser)
router.put("/users/update/:id", verifyToken, validationResource(updateUserSchema), updateUser)
router.delete("/users/delete/:id", verifyToken, validationResource(deleteUserSchema), deleteUser)

export default router
