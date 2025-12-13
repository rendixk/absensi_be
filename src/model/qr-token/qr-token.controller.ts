import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../middleware/auth.middleware"
import type { staf_role } from "./qr-token.service"
import { generate_clock_in_token_service, generate_clock_out_token_service } from "./qr-token.service"
import ErrorOutput from "../../utils/errorOutput"
import chalk from "chalk"

const check_auth = (req: AuthRequest) => {

    const role  = req.user?.role
    const staf_id = req.user?.id
    if(req.user?.role !== "guru" && req.user?.role !== "wali_kelas") {
        console.log(chalk.redBright("Access denied. Only Wali kelas and Guru can manage this absensi session"))
        throw new ErrorOutput("Access denied. Only Wali kelas and Guru can manage this absensi session", 403)
    }

    const { kelas_id } = req.body
    if(!kelas_id) {
        console.log(chalk.redBright("id kelas must be included"))
        throw new ErrorOutput("id kelas must be included", 400)
    }

    const valid_id_kelas = parseInt(kelas_id)
    if(isNaN(valid_id_kelas)) {
        console.log(chalk.redBright("id kelas invalid"))
        throw new ErrorOutput("id kelas invalid", 400)
    }

    return { 
        staf_id: staf_id as number,
        staf_role: role as staf_role,
        kelas_id: valid_id_kelas 
    }
}

export const generate_clock_in_token_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { staf_role, staf_id, kelas_id } = check_auth(req)
        const result = await generate_clock_in_token_service(kelas_id, staf_id, staf_role)

        res.status(200).jsonp({
            success: true,
            // message: "QR Code Token CLOCK_IN success created. Token changes every 20 sec.",
            message: "QR Code Token CLOCK_IN success created. Token changes every 5 min.",
            data: result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const generate_clock_out_token_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { staf_role, staf_id, kelas_id } = check_auth(req)
        const result = await generate_clock_out_token_service(kelas_id, staf_id, staf_role)

        res.status(200).jsonp({
            success: true,
            message: "QR Code Token CLOCK_OUT success created. Token changes every 20 sec.",
            data: result
        })
    } 
    catch (error) {
        next(error)
    }
}