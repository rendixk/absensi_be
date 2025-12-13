import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../../../middleware/auth.middleware"
import { ManageWaliKelasService } from "./manage-wali-kelas.service"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageWaliKelasController {
    private manageWaliKelasService: ManageWaliKelasService
    constructor() {
        this.manageWaliKelasService = new ManageWaliKelasService()
    }

    public getAllWaliKelas = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }
            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            const wali_kelas = await this.manageWaliKelasService.fetchAllWaliKelas()
            console.log(chalk.greenBright("[Backend Controller] Authorized admin user. Received request to get all Wali Kelas data."), wali_kelas)
            res.status(200).json({
                message: "Received request to get all Wali Kelas data.",
                data: wali_kelas 
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public getWaliKelasById = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access Wali Kelas data by ID."))
                throw new ErrorOutput("Forbidden: Only admin users can access Wali Kelas data by ID.", 403)
            }

            const id = Number(req.params.id)
            const wali_kelas_id = await this.manageWaliKelasService.fetchWaliKelasById(id)
            console.log(chalk.greenBright("[Backend Controller] Authorized admin user. Received request to get Wali Kelas data by ID:"), wali_kelas_id)
            res.status(200).json({ 
                message: `Received request to get Wali Kelas data by ID: ${id}`,
                data: wali_kelas_id 
            })
        } 
        catch (error) {
            next(error)
        }
    }
}