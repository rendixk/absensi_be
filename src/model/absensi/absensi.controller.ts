import type { Request, Response, NextFunction } from 'express'
import type { AuthRequest } from '../../middleware/auth.middleware'
import { get_daily_absensi_summary } from './absensi.service';
import ErrorOutput from '../../utils/errorOutput'
import chalk from 'chalk'

export const get_daily_absensi_summary_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const staff_id = req.user?.id
        const staff_role = req.user?.role as "wali_kelas" | "guru"
        if (!staff_id || !staff_role) {
            console.error(chalk.redBright("[Error] Missing authentication"))
            throw new ErrorOutput("Authentication data missing.", 400)
        }

        const { kelas_id } = req.query
        if(!kelas_id) {
            console.error(chalk.redBright("[Error] Missing kelas_id parameter"))
            throw new ErrorOutput("kelas_id parameter is required.", 400)
        }

        const valid_kelas_id = parseInt(kelas_id as string)
        if (isNaN(valid_kelas_id)) {
            console.error(chalk.redBright("[Error] Invalid kelas_id format"))
            throw new ErrorOutput("Invalid kelas_id format.", 400)
        }

        const absensi_summary = await get_daily_absensi_summary(valid_kelas_id, staff_id, staff_role)
        console.log(chalk.greenBright(`[Success] Daily absensi summary for Kelas ${valid_kelas_id} retrieved by Staf ${staff_id}`))

        res.status(200).json({
            succes: true,
            message: "Daily absensi summary retrieved successfully.",
            data: absensi_summary
        })
    }
    catch (error) {
        next(error)
    }
}
