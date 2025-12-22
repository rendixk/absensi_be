import type { Request, Response, NextFunction } from "express"
import { ManageKelasService } from "./manage-kelas.service"
import type { AuthRequest } from "../../../../middleware/auth.middleware"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageKelasController {
    private manageKelasController: ManageKelasService
    constructor() {
        this.manageKelasController = new ManageKelasService()
    }

    public getAllKelas = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            console.log(chalk.cyanBright("[Backend Controller] Authorized admin user. Received request to get all Kelas data."))
            const kelas = await this.manageKelasController.fetchAllKelas()
            console.log(chalk.greenBright("[Backend Controller] Successfully processed request to get all Kelas data."), kelas)
            res.status(200).json({
                message: "Received request to get all Kelas data.",
                data: kelas
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public getKelasById = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            const id = Number(req.params.id)
            console.log(chalk.cyanBright(`[Backend Controller] Authorized admin user. Received request to get Kelas data by ID: ${id}`))
            const kelas_id = await this.manageKelasController.fetchKelasById(id)
            console.log(chalk.greenBright(`[Backend Controller] Successfully processed request to get Kelas data by ID: ${id}`), kelas_id)
            res.status(200).json({ 
                message: `Received request to get Kelas data by ID: ${id}`,
                data: kelas_id 
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public assignWaliKelas = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (req.user?.role !== "admin") throw new ErrorOutput("Forbidden", 403)
            
            const { kelas_id, wali_kelas_id } = req.body
            
            const updated_kelas = await this.manageKelasController.assignWaliKelasToKelas(
                Number(kelas_id), 
                Number(wali_kelas_id)
            )
    
            res.status(200).json({
                message: `Successfully assigned Wali Kelas ${wali_kelas_id} to Kelas ${kelas_id}.`,
                data: updated_kelas 
            })
        } catch (error) {
            next(error)
        }
    }
}