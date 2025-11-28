import type { Request, Response, NextFunction } from "express"
import { guru_bk_auth_login_service, guru_bk_auth_register_service } from "./guru_bk.auth.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const guru_bk_auth_register_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for Guru BK registration:"), req.body)
        console.log(chalk.blueBright("Registerting Guru BK..."))
        const { username, nip, password } = req.body
        if(!username || !nip || !password) {
            console.log(chalk.redBright("All fields are required for registration."))
            throw new ErrorOutput("All fields are required for registration", 400)
        }
        const register_result = await guru_bk_auth_register_service({ username, nip, password })
        console.log(chalk.greenBright("Guru BK registered successfully.", register_result))
        res.status(201).json({
            success: true,
            message: "Guru BK registered successfully.",
            data: register_result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const guru_bk_auth_login_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Debugging: Request body received for Guru BK registration:", req.body)
        console.log(chalk.blueBright("Logging in Guru BK..."))
        const { username, password } = req.body
        if(!username || !password) {
            console.log(chalk.redBright("username and password are required"))
            throw new ErrorOutput("Email and Password are required for login.", 400)
        }

        const login_result = await guru_bk_auth_login_service(username, password)
        console.log("Guru BK logged in successful:", login_result)
        res.status(200).json({
            success: true,
            message: "Guru BK logged in successfully",
            data: login_result
        })
    }  
    catch (error) {
        next(error)
    }
}