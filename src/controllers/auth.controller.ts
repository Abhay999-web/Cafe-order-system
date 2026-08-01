import {userModel} from "../models/user.model.js";
import type {Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export async function register (req: Request, res: Response, next: NextFunction){

   try{

    const {email, username, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Username, Email and Password are required"
        })
    }

    const userAlreadyExists = await userModel.findOne({
       
        $or: [
            {username},
            {email}
        ]
        
    })

    if(userAlreadyExists){
        return res.status(400).json({
            message: "User is alreday exists"+
            (userAlreadyExists.email == email

                ? "Email already exists"
                : "Username already exists"
            )
        })
    }

    const hash = await bcrypt.hash(password, 10)



    /* User created */
    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id : user._id,
        username : user.username

    }, process.env.JWT_SECRET,{
        expiresIn: "4d"
    })

    res.cookie("token", token)

    return res.status(201).json({
        message: "User register successfully",
        user:{
            email: user.email,
            username: user.username
        }
    })
  


   }catch(error){
    next(error);

   }

}

 export async function login(req: Request, res:Response , next: NextFunction){

        
        try{

            const {email, password , username} = req.body

            if((!email && !username ) || !password){
                return res.status(400).json({

                    message: "Email/Username and password required"
                })
            }

            const user = await userModel.findOne({
                $or: [  /* condition email or password */
                    {email},
                    {username}
                    
                ]
            })

            if(!user){
                return res.status(400).json({
                    message: "User not found"
                })
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                 user.password
            )

            if(!isPasswordValid){
                return res.status(400).json({
                    message: "Invalid Password"
                })
            }


           

            const token = jwt.sign({
                id: user._id,
                username : user.username
            },process.env.JWT_SECRET,
        {expiresIn: '4d'}
        )

        res.cookie("token", token)

      return res.status(200).json({
            message: "Login Successfull",
            user:{
                email: user.email,
                username: user.username
            }
        })


        }catch(error){
            next(error)

        }
    }