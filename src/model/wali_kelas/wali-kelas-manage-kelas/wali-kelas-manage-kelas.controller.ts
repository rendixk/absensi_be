import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import { WKManageKelasService } from "./wali-kelas-manage-kelas.service"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export class WKManageKelasController {
    private wKKelasController: WKManageKelasService
    constructor() {
        this.wKKelasController = new WKManageKelasService()
    }

    public getKelasByWKId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }
            if(req.user.role !== "wali_kelas") {
                console.log(chalk.redBright("[Backend Controller] Only wali kelas can access kelas home."))
                throw new ErrorOutput("Forbidden: Only wali kelas can access kelas home.", 403)
            }
            const wali_kelas_id = req.user.id
            const data_kelas = await this.wKKelasController.findKelasWK(wali_kelas_id)
            console.log(chalk.greenBright("[Backend Controller] Authorized wali kelas. Received request to fetch kelas that belongs to the wali kelas"))
            res.status(200).json({
                message: "Received request to get kelas that belongs to the wali kelas",
                data: data_kelas
            })
        }
        catch (error) {
            next(error)
        }
    }
}