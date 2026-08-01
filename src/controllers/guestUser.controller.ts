import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";


export async function guestUser(req: Request, res: Response, next: NextFunction){

    try{

        const guest = await userModel.create({
            username: `guest_${Date.now()}`,    //Date.now() will create identity 
            isGuest: true,
            role: "client"
        })


        const token = jwt.sign({
            id : guest._id,
            isGuest: true
        }, process.env.JWT_SECRET,
    {expiresIn: '5h'}
)

res.cookie("token", token)

return res.status(201).json({
    message: "Guest user created",
    guestId :  guest._id
})


    }catch(error){
        next(error)

    }

}