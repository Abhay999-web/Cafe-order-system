import { userModel } from "../models/user.model.js";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



/* Register */

export async function register(req: Request, res: Response, next: NextFunction) {

    try {

        const { email, username, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, Email and Password are required"
            })
        }

        const userAlreadyExists = await userModel.findOne({

            $or: [
                { username },
                { email }
            ]

        })

        if (userAlreadyExists) {
            return res.status(400).json({
                message: "User is alreday exists" +
                    (userAlreadyExists.email == email

                        ? "Email already exists"
                        : "Username already exists"
                    )
            })
        }

        const hash = await bcrypt.hash(password as string, 10)



        /* User created */
        const user = await userModel.create({
            username,
            email,
            password: hash,
            role: "client"
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role

        }, process.env.JWT_SECRET, {
            expiresIn: "4d"
        })

        res.cookie("token", token)

        return res.status(201).json({
            message: "User register successfully",
            user: {
                email: user.email,
                username: user.username
            }
        })



    } catch (error) {
        next(error);

    }

}

/* Login Controller */


export async function login(req: Request, res: Response, next: NextFunction) {


    try {

        const { email, password, username } = req.body

        if ((!email && !username) || !password) {
            return res.status(400).json({

                message: "Email/Username and password required"
            })
        }

        const user = await userModel.findOne({
            $or: [    /* condition email or password */
                { email },
                { username }

            ]
        })
            .select("+password")  //method of mongoDB to select the password field which is not selected by default in the schema
       

      



        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }



        const isPasswordValid = await bcrypt.compare(
            password as string,
            user.password as string
        )

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid login credentials."
            })
        }




        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role

        }, process.env.JWT_SECRET,
            { expiresIn: '4d' }
        )

        res.cookie("token", token)

        return res.status(200).json({
            message: "Login Successfull",
            user: {
                email: user.email,
                username: user.username
            }
        })


    } catch (error) {
        next(error)

    }
}

/* Get me */

export async function getMe(req: Request, res: Response, next: NextFunction) {


    try {

        const userId = req.user.id

        const user = await userModel.findById(userId)


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }


        return res.status(200).json({
            user: {
                username: user?.username,
                email: user?.email
            }
        })
    } catch (error) {
        next(error)
    }



}

/* Logout */
export function logout(req: Request, res: Response) {
    res.clearCookie("token");

    return res.json({
        message: "Logged out"
    });
}


