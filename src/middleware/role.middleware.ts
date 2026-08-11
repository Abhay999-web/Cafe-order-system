import type { Request, Response, NextFunction } from "express";

type Role = "client" | "admin" | "guest";

export function allowRoles(...allowedRoles: Role[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Login Required"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
}