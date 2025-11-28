import type { Request, Response, NextFunction } from "express"
import { siswa_register_service, siswa_login_service } from "./siswa.auth.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const siswa_register_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for Siswa registration:"), req.body)
        console.log(chalk.blueBright("Registerting Siswa..."))
        const { username, nama_lengkap, password, nis, nomor_wali, nama_kelas } = req.body
        if(!username || !nama_lengkap || !password || !nis || !nomor_wali || !nama_kelas) {
            console.log(chalk.redBright("All fields are required for registration"), req.body)
            throw new ErrorOutput("All fields are required for registration", 400)
        }

        const register_result = await siswa_register_service(req.body, nama_kelas)
        console.log(chalk.greenBright("Siswa logged in successful:"), register_result)
        res.status(201).json({
            success: true,
            message: "Siswa registered successfully.",
            data: register_result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const siswa_login_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Debugging: Request body received for login:"), req.body)
        console.log(chalk.blueBright("Logging in Siswa..."))
        const { username, password } = req.body
        if(!username || !password) {
            console.log(chalk.redBright("username and password are require"))
            throw new ErrorOutput("Email and password are required for login.", 400)
        }

        const login_result = await siswa_login_service(username, password)
        console.log(chalk.greenBright("Siswa logged in successful:"), login_result)
        res.status(200).json({
            success: true,
            message: "Siswa logged in successfully.",
            data: login_result
        })
    } 
    catch (error) {
        next(error)
    }
}