import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import { detail_kelas_service } from "./kelas-detail.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const detail_kelas_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright("Unauthorized: No user information found in request."))
            throw new ErrorOutput("Unauthorized", 401)
        }

        console.log(chalk.cyanBright("Debugging: Request body received for get detail kelas..."))
        const id = Number(req.params.id)
        const detail_kelas = await detail_kelas_service(id)
        console.log(chalk.greenBright("Detail Kelas fetched successfully."), detail_kelas)
        res.status(200).json({
            success: true,
            message: "detail kelas fetched successfully.",
            data: detail_kelas
        })
    } 
    catch (error) {
        next(error)
    }
}