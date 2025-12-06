import type { Request, Response, NextFunction } from "express"
import { 
    kelas_auth_login_service, 
    kelas_auth_register_service,
    guru_logout_kelas_service
} from "./kelas.auth.service"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const kelas_auth_register_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright("Unauthorized: No user information found in request."))
            throw new ErrorOutput("Unauthorized", 401)
        }
        console.log(chalk.cyanBright("Debugging: Request body received for Kelas registration:"), req.body)
        console.log(chalk.blueBright("Registerting Kelas..."))
        const { nama_kelas, password } = req.body
        const wali_kelas = req.user?.id
        if(!nama_kelas || !password) {
            console.log(chalk.redBright("All fields are required for registration."))
            throw new ErrorOutput("All fields are required for registration", 400)
        }
        if(req.user.role !== "wali_kelas") {
            console.log(chalk.redBright("Only users with 'wali_kelas' role can register a Kelas."))
            throw new ErrorOutput("Only users with 'wali_kelas' role can register a Kelas.", 403)
        }
        const register_result = await kelas_auth_register_service({ nama_kelas, password, wali_kelas_id: wali_kelas })
        console.log(chalk.greenBright("Kelas registered successfully."), register_result)
        res.status(201).json({
            success: true,
            message: "Kelas registered successfully.",
            data: register_result
        })
    }
    catch (error) {
        next(error)
    }
}

export const kelas_auth_login_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright("Unauthorized: No user information found in request."))
            throw new ErrorOutput("Unauthorized", 401)
        }

        console.log(chalk.cyanBright("Debugging: Request body received for Kelas login:"), req.body)
        console.log(chalk.blueBright("Logging in Kelas..."))
        const { nama_kelas, password } = req.body
        if(!nama_kelas || !password) {
            console.log(chalk.redBright("nama_kelas and password are required"))
            throw new ErrorOutput("Nama Kelas and Password are required for login.", 400)
        }

        const current_guru = req.user?.id

        const login_result = await kelas_auth_login_service(nama_kelas, password, current_guru)
        console.log(chalk.greenBright("Kelas logged in successful:"), login_result)
        res.status(200).json({
            success: true,
            message: "Kelas logged in successfully",
            data: login_result
        })
    }  
    catch (error) {
        next(error)
    }
}

export const guru_logout_kelas_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const guru_id = req.user?.id
    const { kelas_id } = req.body

    if(!guru_id || !kelas_id) {
        console.log(chalk.redBright("guru_id token and kelas_id are required for logout"), req.body)
        return next(new ErrorOutput("guru_id token and kelas_id are required for logout", 400))
    }

    const valid_kelas_id = parseInt(kelas_id)
    if (isNaN(valid_kelas_id)) {
        console.log(chalk.redBright("Invalid kelas_id format. It must be a number."), req.body)
        throw new ErrorOutput("Invalid kelas_id format.", 400)
    }

    const result = await guru_logout_kelas_service(valid_kelas_id, guru_id)

    console.log(chalk.greenBright("Guru logged out from Kelas successfully."), result)
    res.status(200).json({
        success: true,
        message: "Guru logged out from Kelas successfully.",
        data: result
    })
}