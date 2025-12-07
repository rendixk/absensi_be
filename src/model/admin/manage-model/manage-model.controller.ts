import type { Request, Response, NextFunction } from "express"
import { 
    WaliKelasService,
    GuruBkService,
    GuruService,
    KelasService,
    SiswaService
} from "./manage-model.service"
import type { AuthRequest } from "../../../middleware/auth.middleware"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export class WaliKelasController {
    private waliKelasService: WaliKelasService

    constructor() {
        this.waliKelasService = new WaliKelasService()
    }

    getAllWaliKelas = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            console.log(chalk.cyanBright("[Backend Controller] Received request to get all Wali Kelas data."))
            const wali_kelas = await this.waliKelasService.fetchAllWaliKelas()
            res.status(200).json({ data: wali_kelas })
        } 
        catch (error) {
            next(error)
        }
    }

    getWaliKelasId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            console.log(chalk.cyanBright("[Backend Controller] Received request to get Wali Kelas data by ID."))
            const id = Number(req.params.id)
            const wali_kelas_id = await this.waliKelasService.fetchWaliKelasId(id)
            res.status(200).json({ data: wali_kelas_id })
        } 
        catch (error) {
            next(error)
        }
    }
}

export class GuruController {
    private guruController: GuruService
    constructor() {
        this.guruController = new GuruService()
    }

    getAllGuru = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            console.log(chalk.cyanBright("[Backend Controller] Received request to get all Guru data."))
            const guru = await this.guruController.allGuru()
            res.status(200).json({ data: guru })
        } 
        catch (error) {
            next(error)
        }
    }

    getGuruId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }

            console.log(chalk.cyanBright("[Backend Controller] Received request to get Guru data by ID."))
            const id = Number(req.params.id)
            const guru_id = await this.guruController.guruId(id)
            res.status(200).json({ data: guru_id })
        } 
        catch (error) {
            next(error)
        }
    }
}

export class GuruBkController {
    private guruBkController: GuruBkService
    constructor() {
        this.guruBkController = new GuruBkService()
    }

    getAllGuruBk = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            
            console.log(chalk.cyanBright("[Backend Controller] Received request to get all Guru BK data."))
            const guru_bk = await this.guruBkController.allGuruBk()
            res.status(200).json({ data: guru_bk })
        } 
        catch (error) {
            next(error)
        }
    }

    getGuruBkId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            
            console.log(chalk.cyanBright("[Backend Controller] Received request to get Guru BK data by ID."))
            const id = Number(req.params.id)
            const guru_bk_id = await this.guruBkController.guruBkId(id)
            res.status(200).json({ data: guru_bk_id })
        } 
        catch (error) {
            next(error)
        }
    }
}

export class KelasController {
    private kelasController: KelasService
    constructor() {
        this.kelasController = new KelasService()
    }

    getAllKelas = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            
            console.log(chalk.cyanBright("[Backend Controller] Received request to get all Kelas data."))
            const kelas = await this.kelasController.fetchAllKelas()
            res.status(200).json({ data: kelas })
        } 
        catch (error) {
            next(error)
        }
    }

    getKelasId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            
            console.log(chalk.cyanBright("[Backend Controller] Received request to get Kelas data by ID."))
            const id = Number(req.params.id)
            const kelas_id = await this.kelasController.fetchKelasId(id)
            res.status(200).json({ data: kelas_id })
        } 
        catch (error) {
            next(error)
        }
    }
}

export class SiswaController {
    private siswaController: SiswaService
    constructor() {
        this.siswaController = new SiswaService()
    }

    getAllSiswa = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            
            console.log(chalk.cyanBright("[Backend Controller] Received request to get all Kelas data."))
            const siswa = await this.siswaController.fetchAllSiswa()
            res.status(200).json({ data: siswa })
        } 
        catch (error) {
            next(error)
        }
    }

    getSiswaId = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if(!req.user) {
                console.log(chalk.redBright("Unauthorized: No user information found in request."))
                throw new ErrorOutput("Unauthorized", 401)
            }

            if(req.user.role !== "admin") {
                console.log(chalk.redBright("Forbidden: Only admin users can access all Wali Kelas data."))
                throw new ErrorOutput("Forbidden: Only admin users can access all Wali Kelas data.", 403)
            }
            
            console.log(chalk.cyanBright("[Backend Controller] Received request to get Kelas data by ID."))
            const id = Number(req.params.id)
            const siswa_id = await this.siswaController.fetchSiswaId(id)
            res.status(200).json({ data: siswa_id })
        } 
        catch (error) {
            next(error)
        }
    }
}