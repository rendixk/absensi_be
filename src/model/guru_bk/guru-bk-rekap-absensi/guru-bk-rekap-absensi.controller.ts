import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import { generate_monthly_rekap_service, get_monthly_rekap_absensi_service } from "./guru-bk-rekap-absensi.service"
import chalk from "chalk"
import ErrorOutput from "../../../utils/errorOutput"

export const trigger_monthly_rekap_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const guru_bk_id = req.user?.id as number

        const { kelas_id, bulan, tahun } = req.body

        if(!kelas_id || !bulan || !tahun) {
            console.log(chalk.redBright("[REKAP] Missing required fields in request body"), req.body)
            throw new ErrorOutput("Missing required fields: kelas_id, bulan, tahun", 400)
        }

        const result = await generate_monthly_rekap_service(
            parseInt(kelas_id),
            parseInt(bulan),
            parseInt(tahun),
            guru_bk_id
        )

        res.status(200).json({
            status: "success",
            message: `Monthly report generated/updated for ${result.length} students.`,
            data: result
        })
    }
    catch (error: any) {
        console.error(chalk.redBright(error))
        next(error)
    }
}

export const get_monthly_rekap_absensi_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { kelas_id, bulan, tahun } = req.query
        if(!kelas_id || !bulan || !tahun) {
            console.log(chalk.redBright("[REKAP] Missing required query parameters"), req.query)
            throw new ErrorOutput("Missing required query parameters: kelas_id, bulan, tahun", 400)
        }

        const result = await get_monthly_rekap_absensi_service(
            parseInt(kelas_id as string),
            parseInt(bulan as string),
            parseInt(tahun as string)
        )

        res.status(200).json({
            status: true,
            message: "Monthly rekap report retrieved successfully.",
            data: result
        })
    } 
    catch (error: any) {
        console.error(chalk.redBright(error))
        next(error)
    }
}