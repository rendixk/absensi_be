import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../../../middleware/auth.middleware"
import { ManageSiswaService } from "./manage-siswa.service"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageSiswaController {
    private manageSiswaService: ManageSiswaService
    constructor() {
        this.manageSiswaService = new ManageSiswaService()
    }

    public getAllSiswa = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }
            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Siswa data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Kelas data.", 403)
            }

            const siswa = await this.manageSiswaService.fetchAllSiswa()
            console.log(chalk.greenBright("[Backend Controller] Authorized admin user. Received request to get all Siswa data."), siswa)
            res.status(200).json({
                message: "Received request to get all Siswa data.",
                data: siswa 
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public getSiswaById = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access Siswa data by ID."))
                throw new ErrorOutput("Forbidden: Only admin users can access Kelas data by ID.", 403)
            }

            const id = Number(req.params.id)
            const siswa_id = await this.manageSiswaService.fetchSiswaById(id)
            console.log(chalk.greenBright("[Backend Controller] Authorized admin user. Received request to get Siswa data by ID:"), siswa_id)
            res.status(200).json({ 
                message: `Received request to get Siswa data by ID: ${id}`,
                data: siswa_id 
            })
        } 
        catch (error) {
            next(error)
        }
    }
}