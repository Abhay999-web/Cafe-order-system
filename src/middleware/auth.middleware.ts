import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



interface UserPayload {
    id: string,
    username: string,
    role: 'client' | 'admin'| 'guest'
}



export function identifyUser(req: Request, res: Response, next: NextFunction) {
    try {

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Login Required"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) as UserPayload;

        req.user = decoded;   //jwt.verify() returns string | JwtPayload, so I cast it to my custom UserPayload because I know what I stored in the token.

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        })

    }
}