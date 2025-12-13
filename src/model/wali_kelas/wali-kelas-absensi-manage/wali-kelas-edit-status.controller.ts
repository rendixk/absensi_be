import type { Request, Response, NextFunction } from "express"
import { edit_status_absensi_service } from "./wali-kelas-edit-status.service"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import { Status_Kehadiran } from "../../../generated"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const wali_kelas_edit_status_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright(`[ERROR] Unauthenticated access attempt to edit absensi status.`))
            throw new ErrorOutput("Unauthenticated: User not logged in.", 401)
        }

        const wali_kelas_id = req.user?.id
        const role = req.user?.role

        if(role !== "wali_kelas") {
            console.log(chalk.redBright(`[ERROR] Unauthorized access attempt by user ID ${wali_kelas_id} with role ${role}.`))
            throw new ErrorOutput("Unauthorized: Access is restricted to Wali Kelas only.", 403)
        }

        const { absensi_id, new_status } = req.body as {
            absensi_id: number,
            new_status: Status_Kehadiran
        }

        if(!absensi_id || !new_status) {
            console.log(chalk.redBright(`[ERROR] Missing parameters in request body by Wali Kelas ID ${wali_kelas_id}.`))
            throw new ErrorOutput("Bad Request: 'absensi_id' and 'new_status' are required.", 400)
        }

        const result = await edit_status_absensi_service(
            absensi_id,
            new_status,
            wali_kelas_id
        )

        console.log(chalk.greenBright(`[SUCCESS] Wali Kelas ID ${wali_kelas_id} successfully edited status of Absensi ID ${absensi_id} to '${new_status}'.`))
        res.status(200).json({
            success: true,
            message: "Absensi status updated successfully.",
            data: result
        })
    } 
    catch (error) {
        next(error)
    }
}
