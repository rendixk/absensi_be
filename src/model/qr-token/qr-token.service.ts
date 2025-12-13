import jwt from "jsonwebtoken"
import { prisma } from "../../config/prisma"
import { QR_Code_Type } from "../../generated"
import ErrorOutput from "../../utils/errorOutput"
import chalk from "chalk"

const JWT_TOKEN = process.env.JWT_SECRET as string
// const EXPIRY_SEC = 15
const EXPIRY_SEC = 300

export type staf_role = "wali_kelas" | "guru"

const generate_qr_token_service = async (
    kelas_id: number,
    staf_id: number,
    staf_role: staf_role,
    qr_type: QR_Code_Type
) => {
    const data_kelas = await prisma.kelas.findUnique({ where: { id: kelas_id } })
    if(!data_kelas) {
        console.log(chalk.redBright("Kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }
    // if(data_kelas.guru_id !== guru_id) {
    //     console.log(chalk.redBright(`Access denied: Guru ID ${guru_id} are not active guru in kelas_id ${kelas_id}`))
    //     throw new ErrorOutput("You are not active guru in this kelas. please re-login to kelas.", 403)
    // }
    if(staf_role === "wali_kelas") {
        if(data_kelas.wali_kelas_id !== staf_id) {
            console.log(chalk.redBright(`Access denied: Wali Kelas ID ${staf_id} is not the active Wali Kelas for kelas_id ${kelas_id}`))
            throw new ErrorOutput("You are not the active Wali Kelas for this class.", 403)
        }
    } 
    else if (staf_role === "guru") {
        if(data_kelas.guru_id !== staf_id) {
            console.log(chalk.redBright(`Access denied: Guru ID ${staf_id} is not the active Guru for kelas_id ${kelas_id}`))
            throw new ErrorOutput("You are not the active Guru for this class.", 403)
        }
    }
    else {
        console.log(chalk.redBright("Unathorized role to generate QR token"))
        throw new ErrorOutput("Unauthorized role to generate QR token.", 403)
    }


    const current_timestamp = Date.now().toString()

    const payload = {
        kelas_id: kelas_id,
        qrtype: qr_type,
        nonce: current_timestamp
    }

    const token = jwt.sign(payload, JWT_TOKEN, {
        expiresIn: `${EXPIRY_SEC}s`,
        subject: kelas_id.toString()
    })

    console.log(chalk.greenBright(`[Backend Debug] New QR Token (${qr_type}) successful created for Kelas ${kelas_id}.`))
    return { qr_token: token, kelas_id: kelas_id, expires_in_second: EXPIRY_SEC, qr_type }
}

export const generate_clock_in_token_service = (kelas_id: number, staf_id: number, staf_role: staf_role) => {
    return generate_qr_token_service(kelas_id, staf_id, staf_role, QR_Code_Type.clock_in)
}

export const generate_clock_out_token_service = (kelas_id: number, staf_id: number, staf_role: staf_role) => {
    return generate_qr_token_service(kelas_id, staf_id, staf_role, QR_Code_Type.clock_out)
}