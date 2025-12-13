import type { Request, Response, NextFunction } from 'express'
import { ManageGuruService } from './manage-guru.service'
import type { AuthRequest } from '../../../../middleware/auth.middleware'
import ErrorOutput from '../../../../utils/errorOutput'
import chalk from 'chalk'

export class ManageGuruController {
    private manageGuruService: ManageGuruService
    constructor() {
        this.manageGuruService = new ManageGuruService()
    }

    public getAllGuru = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }
            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            const guru = await this.manageGuruService.fetchAllGuru()
            console.log(chalk.greenBright("[Backend Controller] Authorized admin user. Received request to get all Wali Kelas data."), guru)
            res.status(200).json({
                message: "Received request to get all Wali Kelas data.",
                data: guru 
            })
        } 
        catch (error) {
            next(error)
        }
    }

    public getGuruId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            const id = Number(req.params.id)
            const guru_id = await this.manageGuruService.fetchGuruById(id)
            console.log(chalk.greenBright("[Backend Controller] Authorized admin user. Received request to get Wali Kelas data by ID:"), guru_id)
            res.status(200).json({ 
                message: `Received request to get Wali Kelas data by ID: ${id}`,
                data: guru_id 
            })
        } 
        catch (error) {
            next(error)
        }
    }
}