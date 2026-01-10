import type { Request, Response, NextFunction } from "express"
import { edit_status_absensi_service } from "./edit-presensi-status.service"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import { Status_Kehadiran } from "../../../generated"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

interface PresensiNew {
    siswa_id: number,
    new_status: Status_Kehadiran
}

export const edit_status_absensi_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            console.log(chalk.redBright(`[ERROR] Unauthenticated access attempt to edit absensi status.`))
            throw new ErrorOutput("Unauthenticated: User not logged in.", 401)
        }

        const user_id = req.user?.id
        const role = req.user?.role

        if(role !== "wali_kelas" && role !== "guru") {
            console.log(chalk.redBright(`[ERROR] Unauthorized access attempt by user ID ${user_id} with role ${role}.`))
            throw new ErrorOutput("Unauthorized: Access is restricted to Wali Kelas and Guru only.", 403)
        }

        // const { siswa_id, new_status } = req.body as PresensiNew
        const siswa: PresensiNew = req.body

        if(!siswa.siswa_id || !siswa.new_status) {
            console.log(chalk.redBright(`[ERROR] Missing parameters in request body by Wali Kelas ID ${user_id}.`))
            throw new ErrorOutput("Bad Request: 'absensi_id' and 'new_status' are required.", 400)
        }

        const result = await edit_status_absensi_service(
            siswa.siswa_id,
            siswa.new_status,
            user_id
        )

        console.log(chalk.greenBright(`[Backend Controller] User ID ${user_id} successfully edited status of Absensi ID ${siswa.siswa_id} to '${siswa.new_status}'.`))
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
