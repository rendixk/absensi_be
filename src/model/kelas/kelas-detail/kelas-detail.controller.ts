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
        if(req.user.role === "siswa") {
            console.log(chalk.redBright(`[Backend Controller] Forbidden: Role ${req.user.role} is not allowed.`));
            throw new ErrorOutput("Forbidden: Access denied for your role.", 403);
        }

        const user_id = Number(req.user.id)
        console.log(chalk.cyanBright(`Fetching detail kelas for User ID: ${user_id}...`))

        const detail_kelas = await detail_kelas_service(user_id)

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