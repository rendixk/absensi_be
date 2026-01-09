import type { Request, Response, NextFunction } from "express"
import type { SiswaAuthRequest } from "../../../middleware/siswa-auth.middleware"
import { SiswaProfileService } from './siswa-profile.service';
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

interface SiswaProfile {
        username: string,
        nama_lengkap: string,
        nis: string,
        nomor_wali: string,
        avatar: string
}

export class SiswaProfileController {
    private siswaProfileService: SiswaProfileService
    constructor() {
        this.siswaProfileService = new SiswaProfileService()
    }

    public SiswaProfile = async (req: SiswaAuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }
            const siswa_id = req.user.id
            // const role = req.user?.role
            
            // if(role !== "siswa") {
            //     console.log(chalk.yellowBright("[Backend Controller] Forbidden: Only siswa can access this."))
            //     throw new ErrorOutput("Forbidden: Only siswa can access this.", 403)
            // }
            const data_siswa = await this.siswaProfileService.findProfileSIswaId(siswa_id)
            console.log(chalk.greenBright("[Backend Controller] Authorized siswa. Received request to get Siswa profile:"), data_siswa)
            res.status(200).json({
                message: `Received request to get Siswa data by ID: ${siswa_id}`,
                data: data_siswa
            })
        }
        catch (error) {
            next(error)
        }
    }

    public editSiswaProfileController = async (req: SiswaAuthRequest, res: Response, next: NextFunction) => {
        try {
            console.log(chalk.blueBright("[Controller] Checking user role:"), req.user?.role)

            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }
            // if(req.user.role !== "siswa") {
            //     console.log(chalk.yellowBright(`[Backend Controller] Forbidden: Role is ${req.user.role}`))
            //     throw new ErrorOutput("Forbidden: Only siswa can access this.", 403)
            // }
            const data_siswa: SiswaProfile = req.body
            const siswa_id = req.user.id

            const file = (req.file as Express.Multer.File)?.filename

            if(file) {
                data_siswa.avatar = file
                console.log(chalk.greenBright("profile uploaded"), file)
            }
            else {
                delete (data_siswa as any).avatar
            }

            const siswa_profile_update = await this.siswaProfileService.siswaProfileEdit(siswa_id, data_siswa)
            console.log(chalk.greenBright("Siswa profile edited successfully"), siswa_profile_update)
            res.status(201).json({
                message: "Siswa profile updated succeessfully",
                data: siswa_profile_update
            })
        } 
        catch (error) {
            next(error)
        }
    }
}