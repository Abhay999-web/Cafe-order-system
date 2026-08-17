import type {Request, Response, NextFunction} from "express"



export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction){


console.error(error);

return res.status(500).json({
    message: "Internal Server Error"

})

}