import type { Request, Response, NextFunction } from "express"
import { auth_login_service, auth_register_service } from "./admin.auth.service"
// import * as AuthService from "./admin.auth.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const auth_register_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Registerting Admin..."))
        const { username, email, password } = req.body
        if(!username || !email || !password) {
            console.log(chalk.red("All fields are required for registration."))
            throw new ErrorOutput("All fields are required for registration.", 400)
        }
        const register_result = await auth_register_service(email, { username, email, password })
        console.log(chalk.greenBright("Admin registered successfully."))
        res.status(201).json({
            success: true,
            message: "Admin registered successfully.",
            data: register_result
        })
    }
    catch (error) {
        next(error)
    }
}

export const auth_login_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Debugging: Request body received for login:", req.body)
        console.log(chalk.blueBright("Logging in Admin..."))
        const { email, password } = req.body
        if(!email || !password) {
            throw new ErrorOutput("Email and password are required for login.", 400)
        }

        const login_result = await auth_login_service(email, password)
        console.log(chalk.greenBright("Admin logged in successfully."))
        res.status(200).json({
            success: true,
            message: "Admin logged in successfully.",
            data: login_result
        })
    }
    catch (error) {
        next(error)
    }
}