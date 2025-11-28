import type { Request, Response, NextFunction } from "express"
import { wali_kelas_register_service, wali_kelas_login_service } from "./wali_kelas.auth.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const wali_kelas_register_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for Wali Kelas registration:"), req.body)
        console.log(chalk.blueBright("Registerting Wali Kelas..."))
        const { username, nip, mapel, password } = req.body
        if(!username || !nip || !mapel || !password) {
            console.log(chalk.red("All fields are required for Wali Kelas registration."))
            throw new ErrorOutput("All fields are required for registration.", 400)
        }

        const register_result = await wali_kelas_register_service({ username, nip, mapel, password })
        console.log(chalk.greenBright("Wali Kelas registered successfully."), register_result)
        res.status(201).json({
            success: true,
            message: "Wali Kelas registered successfully.",
            data: register_result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const wali_kelas_login_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Debugging: Request body received for login:", req.body)
        console.log(chalk.blueBright("Logging in Wali Kelas..."))
        const { username, password } = req.body
        if(!username || !password) {
            console.log(chalk.redBright("username and password are require"))
            throw new ErrorOutput("Username and password are required for login.", 400)
        }

        const login_result = await wali_kelas_login_service(username, password)
        console.log(chalk.greenBright("Wali Kelas logged in successfully."), req.body)
        res.status(200).json({
            success: true,
            message: "Wali Kelas logged in successfully.",
            data: login_result
        })
    } 
    catch (error) {
        next(error)
    }
}