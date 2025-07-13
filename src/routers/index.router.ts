import express from "express"
import AdminRouter from "./admin.router"
import UserRouter from "./user.router"

const router = express.Router()

router.use("/admin", AdminRouter)
router.use("/user", UserRouter)

export default router