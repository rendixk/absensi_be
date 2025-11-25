import type { Request, Response, NextFunction } from "express"
import { admin_auth_login_service, admin_auth_register_service } from "./admin.auth.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const admin_auth_register_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for Admin registration:"), req.body)
        console.log(chalk.blueBright("Registerting Admin..."))
        const { username, password } = req.body
        if(!username|| !password) {
            console.log(chalk.red("All fields are required for registration."))
            throw new ErrorOutput("All fields are required for registration.", 400)
        }
        const register_result = await admin_auth_register_service({ username, password })
        console.log(chalk.greenBright("Admin registered successfully."), register_result)
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

export const admin_auth_login_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for login:"), req.body)
        console.log(chalk.blueBright("Logging in Admin..."))
        const { username, password } = req.body
        if(!username || !password) {
            console.log(chalk.redBright("username and password are require"))
            throw new ErrorOutput("username and password are required for login.", 400)
        }

        const login_result = await admin_auth_login_service(username, password)
        console.log(chalk.greenBright("Admin logged in successfully."), login_result)
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