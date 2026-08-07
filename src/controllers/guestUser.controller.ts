import jwt from "jsonwebtoken"
import type {Request , Response, NextFunction } from "express"
import crypto from "crypto"


export async function guestLogin(req: Request, res: Response, next: NextFunction ){

 try{

    const guestId = crypto.randomUUID() //this will generate a random unique id for the guest user

    const token = jwt.sign(
        {
            role: "guest",
            guestId : guestId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "5h"
        }

    )

    res.cookie("token", token,{
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 1000 //millisecod
    })

    return res.status(200).json({
        message: "Guest login successfully",
        guestId
    })


 }catch(error){
    next(error)
 }

}