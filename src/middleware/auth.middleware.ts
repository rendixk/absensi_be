import type { Request, Response, NextFunction } from "express"
import ErrorOutput from "../utils/errorOutput"
import chalk from "chalk"
import { verify_token } from "../config/auth_policy/jwt"

export interface AuthRequest extends Request {
    user?: {
        id: number
        email: string
    }
}

export const auth_token_middleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        console.log(chalk.red("Access Denied: No token provided"))
        return next(new ErrorOutput("Access Denied: No token provided", 401))
    }

    try {
        const decoded = verify_token(token) as { id: number; email: string }
        req.user = {
            id: decoded.id,
            email: decoded.email
        }
        next()
        
    } catch (error) {
        console.log(chalk.redBright("Access Denied: Invalid or expired token"))
        return next(new ErrorOutput("Access Denied: Invalid or expired token", 401))
    }
}