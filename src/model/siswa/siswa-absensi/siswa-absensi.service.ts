import { verify_token } from "../../../config/auth_policy/jwt"
import { 
    create_absensi_record, 
    find_absensi_today, 
    update_absensi_clock_out 
} from "./siswa-absensi.repo"
import type { CheckInInput } from "./interface/siswa-absensi.interface"
import type { QR_Token_Payload } from "../../qr-token/interface/qr-token_interface"
import { Status_Kehadiran } from "../../../generated"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"
import jwt from "jsonwebtoken"

interface FullQR_Payload extends QR_Token_Payload {
    nonce: string
}

export const handle_check_in_service = async (data: CheckInInput) => {
    const { kelas_id, qr_type, siswa_id } = data
    const current_time = new Date()

    // 1. Cek record absensi today
    const existing_record = await find_absensi_today(siswa_id, kelas_id)

    // logic clock-in
    if(qr_type === 'clock_in') {
        if(existing_record) {
            console.log(chalk.yellow(`Siswa ${siswa_id} already clock-in today`))
            throw new ErrorOutput("You already clock-in today", 409)
        }

        await create_absensi_record({
            siswa_id: siswa_id,
            kelas_id: kelas_id,
            status: Status_Kehadiran.hadir,
            clock_in: current_time
        })

        const message = "Clock-in successfully recorded. Temporary status is 'hadir'"

        console.log(chalk.greenBright(`Siswa ${siswa_id} successful clock-in.`))
        return { message: message }
    }

    else if (qr_type === 'clock_out') {

        // clock-out logic
        if(!existing_record) {
            console.log(chalk.redBright(`Siswa ${siswa_id} tried to use clock-out without clock-in`))
            // Siswa couldn't clock-out if have not clock-in yet
            throw new ErrorOutput("You have not clock-in today. Clock-out denied", 403)
        }

        if(existing_record.clock_out) {
            console.log(chalk.yellowBright(`Siswa ${siswa_id} already clock-out before`))
            throw new ErrorOutput("You already clock-out today", 409)
        }

        // Update absensi record using clock-out time
        await update_absensi_clock_out(existing_record.id, current_time)

        console.log(chalk.greenBright(`Siswa ${siswa_id} successful clock-out. Presence confirmed`))
        return { message: "Clock-out successful recorded. Presence confirmed" }
    }

    else {
        console.log(chalk.redBright("QR Code Type Invalid"))
        throw new ErrorOutput("QR Code Type Invalid", 400)
    }
}

export const verify_qrtoken = (qr_token: string) => {
    try {
        const decoded_payload = verify_token(qr_token) as FullQR_Payload
        const { kelas_id, qrtype } = decoded_payload

        if (!kelas_id || !qrtype) {
            console.log(chalk.redBright("QR Token is malformed: Missing Kelas ID or QR Type"));
            throw new ErrorOutput("Invalid QR Token structure.", 400);
        }

        return {
            kelas_id_qr: kelas_id,
            qr_type: qrtype
        }
    } 
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log(chalk.redBright("QR Token is expired."));
            throw new ErrorOutput("QR Token is expired. Please ask the teacher to regenerate it.", 401);
        }
        if (error instanceof jwt.JsonWebTokenError) {
            console.log(chalk.redBright("QR Token is invalid."));
            throw new ErrorOutput("Invalid QR Token.", 401);
        }
        throw error;
    }
}