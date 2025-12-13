import type { Request, Response, NextFunction } from "express"
import type { SiswaAuthRequest } from "../../../middleware/siswa-auth.middleware"
import { handle_check_in_service, verify_qrtoken } from "./siswa-absensi.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const check_in_siswa_controller = async (req: SiswaAuthRequest, res: Response, next: NextFunction) => {
    try {
        const siswa_id = req.user?.id
        const kelas_id = req.user?.kelas_id
        const qr_token = req.body.qr_token as string

        if (!siswa_id || !qr_token || !kelas_id) {
            console.log(chalk.redBright("Missing authentication data or QR payload."))
            throw new ErrorOutput("Access Denied: Siswa authentication data or QR incomplete.", 401)
        }

        const qr_payload = verify_qrtoken(qr_token)

        if(kelas_id !== qr_payload.kelas_id_qr) {
            console.log(chalk.redBright(`Siswa ${siswa_id} attempted clock-in in wrong class (QR Kelas ID: ${qr_payload.kelas_id_qr})`))
            throw new ErrorOutput("Attendance denied. Cannot clock-in to another class.", 403)
        }

        const data_input = {
            siswa_id: siswa_id,
            kelas_id: kelas_id,
            qr_token: qr_token,
            qr_type: qr_payload.qr_type
        }

        const result = await handle_check_in_service(data_input)

        res.status(200).json({
            success: true,
            message: result.message
        })
    } 
    catch (error) {
        next(error)
    }
}