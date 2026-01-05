import type { Request, Response, NextFunction} from "express"
import type { AuthRequest } from "../../middleware/auth.middleware"
import { rekap_absensi_service } from "./rekap-absensi.service"
import { prisma } from "../../config/prisma"
import ErrorOutput from "../../utils/errorOutput"
import chalk from "chalk"

export const rekap_absensi_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright("Unauthorized: No user information found in request."))
            throw new ErrorOutput("Unauthorized", 401)
        }

        const role = req.user?.role
        const user_id = req.user.id

        let { kelas_id, minggu, bulan, tahun } = req.query

        if(role === "wali_kelas") {
            const my_kelas = await prisma.kelas.findFirst({ where: { wali_kelas_id: user_id } })
            if(!my_kelas) {
                console.log(chalk.yellowBright("Wali kelas is not assigned to any kelas"))
                throw new ErrorOutput("You are not assigned to any class", 404)
            }
            kelas_id = my_kelas.id.toString()
            console.log(chalk.cyan(`[Backend Controller] Wali Kelas ${user_id} accessing kelas ${kelas_id}`))
        }
        else if (role === "guru_bk") {
            if (!kelas_id) {
                console.log(chalk.redBright("[Backend Controller] Guru BK must provide kelas_id"))
                throw new ErrorOutput("Guru BK must provide kelas_id", 400)
            }
        }
        else {
            console.log(chalk.redBright("[Backend Controller] Access forbidden for your role"))
            throw new ErrorOutput("Access forbidden for your role", 400)
        }

        if (!minggu || !bulan || !tahun) {
            console.log(chalk.redBright("[Backend Controller] Missing parameters: minggu, bulan, tahun"), req.body)
            throw new ErrorOutput("Missing parameters: minggu, bulan, tahun", 400);
        }

        const data = await rekap_absensi_service(
            Number(kelas_id),
            Number(minggu),
            Number(bulan),
            Number(tahun)
        )

        res.status(200).json({
            success: true,
            message: `Rekap fetched successfully for ${role}`,
            data: data
        })
    } 
    catch (error) {
        next(error)
    }
}