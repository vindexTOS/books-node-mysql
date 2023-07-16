import express from 'express'
import { Register, Login } from '../controllers/user-controller.js'

const userRouter = express.Router()

userRouter.route('/register').post(Register)
userRouter.route('/login').post(Login)
export default userRouter
