import type { Request, Response, NextFunction } from "express"
import ErrorOutput from "../utils/errorOutput"
import chalk from "chalk"
import { verify_token } from "../config/auth_policy/jwt"
import type { Role } from "../generated"

export interface SiswaAuthRequest extends Request{
    user?: {
        id: number,
        role: Role,
        kelas_id: number
    }
}

export const siswa_auth_middleware = (req: SiswaAuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        console.log(chalk.red("Access Denied: No token provided"))
        return next(new ErrorOutput("Access Denied: No token provided", 401))
    }

    try {
        const decoded = verify_token(token) as { id: number, role: Role, kelas_id: number }

        req.user = {
            id: decoded.id,
            role: decoded.role,
            kelas_id: decoded.kelas_id
        }

        next()
    } 
    catch (error: any) {
        console.error(chalk.redBright("Access Denied: Invalid or expired token"), error)
        return next(new ErrorOutput("Access Denied: Invalid or expired token", 401))
    }
}