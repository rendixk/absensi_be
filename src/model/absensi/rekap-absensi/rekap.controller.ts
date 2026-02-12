import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import { generate_rekap_service } from "./rekap.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const rekap_presensi_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright("Unauthorized: No user information found in request."))
            throw new ErrorOutput("Unauthorized", 401)
        }

        const user_role = req.user.role

        if(user_role !== "wali_kelas" && user_role !== "guru_bk") {
            console.log(chalk.redBright("[Error]: Only wali kelas and guru bk can access this."))
            throw new ErrorOutput("Only wali kelas and guru bk can access this.", 401)
        }

        const { kelas_id, minggu, bulan, tahun } = req.query

        const date_now = new Date()
        const active_minggu = minggu ? Number(minggu) : Math.ceil(date_now.getDate() / 7)
        const active_bulan = bulan ? Number(bulan) : date_now.getMonth() + 1
        const active_tahun = tahun ? Number(tahun) : date_now.getFullYear()

        const data = await generate_rekap_service(
            Number(kelas_id),
            active_minggu,
            active_bulan,
            active_tahun
        )

        res.status(200).json({
            success: true,
            message: "rekap presensi fetched successfully",
            data: data
        })
    }
    catch (error) {
        next(error)
    }
}