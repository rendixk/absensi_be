import type { Request, Response, NextFunction } from "express"
import { ManageGuruBKService } from "./manage-guru-bk.service"
import type { AuthRequest } from "../../../../middleware/auth.middleware"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageGuruBKController {
    private manageGuruBKService: ManageGuruBKService
    constructor() {
        this.manageGuruBKService = new ManageGuruBKService()
    }

    public getAllGuruBK = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Guru BK data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            console.log(chalk.cyanBright("[Backend Controller] Authorized admin user. Received request to get all Guru BK data."))
            const guru_bk = await this.manageGuruBKService.fetchAllGuruBK()
            console.log(chalk.greenBright("[Backend Controller] Successfully processed request to get all Guru BK data."), guru_bk)
            res.status(200).json({
                message: "Received request to get all Guru BK data.",
                data: guru_bk
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public getGuruBKById = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Guru BK data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            const id = Number(req.params.id)
            console.log(chalk.cyanBright(`[Backend Controller] Authorized admin user. Received request to get Guru BK data by ID: ${id}`))
            const guru_bk_id = await this.manageGuruBKService.fetchGuruBKById(id)
            console.log(chalk.greenBright(`[Backend Controller] Successfully processed request to get Guru BK data by ID: ${id}`), guru_bk_id)
            res.status(200).json({ 
                message: `Received request to get Guru BK data by ID: ${id}`,
                data: guru_bk_id 
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public deleteGuruBK = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Guru BK data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            const id = Number(req.params.id)
            console.log(chalk.cyanBright(`[Backend Controller] Authorized admin. Received request to get Guru BK data by ID: ${id}`))
            const guru_bk_id = await this.manageGuruBKService.deleteGuruBk(id)
            console.log(chalk.greenBright(`[Backend Controller] Successfully processed request to delete Guru BK with ID: ${id}`), guru_bk_id)
            res.status(200).json({
                success: true,
                message: "Successfully processed request to delete Guru BK"
            })
        } 
        catch (error) {
            next(error)    
        }
    }
}