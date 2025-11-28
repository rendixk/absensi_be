import type { Request, Response, NextFunction } from "express"
import { guru_auth_register_service, guru_auth_login_service } from "./guru.auth.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const guru_auth_register_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for register:"), req.body)
        console.log(chalk.blueBright("Registerting Guru..."))
        const { username, nip, mapel, password } = req.body
        if(!username || !nip || !mapel || !password) {
            console.log(chalk.red("All fields are required for registration."))
            throw new ErrorOutput("All fields are required for registration.", 400)
        }

        const register_result = await guru_auth_register_service({ username, nip, mapel, password })
        console.log(chalk.greenBright("Guru registered successfully."), register_result)
        res.status(201).json({
            success: true,
            message: "Guru registered successfully.",
            data: register_result
        })
    }
    catch (error) {
        next(error)
    }
}

export const guru_auth_login_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for login:"), req.body)
        console.log(chalk.blueBright("Logging in Guru..."))
        const { username, password } = req.body
        if(!username || !password) {
            console.log(chalk.redBright("username and password are require"))
            throw new ErrorOutput("Email and password are required for login.", 400)
        }

        const login_result = await guru_auth_login_service(username, password)
        console.log(chalk.greenBright("Guru logged in successfully."))
        res.status(200).json({
            success: true,
            message: "Guru logged in successfully.",
            data: login_result
        })
    }
    catch (error) {
        next(error)
    }
}