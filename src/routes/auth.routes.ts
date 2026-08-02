import express from 'express'
import {register, login , getMe, logout} from "../controllers/auth.controller.js"
import { identifyUser } from '../middleware/auth.middleware.js'


const authRouter = express.Router()


/* POST api/auth/register */
authRouter.post("/register" , register)


/* POST api/auth/login */
authRouter.post("/login" , login)


/* GET api/auth/getMe */
authRouter.get("/getMe", identifyUser, getMe)


/* POST api/auth/logout */
authRouter.post("/logout", logout)


export default authRouter;