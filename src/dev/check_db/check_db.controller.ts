// import type { NextFunction, Request, Response } from 'express'
// import * as check_service from './check_db.service'
// import chalk from 'chalk'

// export const check_admin_model_controller = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const admin = await check_service.check_admin_model_service()
//         console.log(chalk.greenBright("Admin model check successful:"), admin)
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 admin_model: admin
//             }
//         })
//     } 
//     catch (error) {
//         next(error)    
//     }
// }

// export const check_guru_model_controller = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const guru = await check_service.check_guru_model_service()
//         console.log(chalk.greenBright("Guru model check successful:"), guru)
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 guru_model: guru
//             }
//         })
//     } 
//     catch (error) {
//         next(error)    
//     }
// }

// export const check_guru_bk_model_controller = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const guru_bk = await check_service.check_guru_bk_model_service()
//         console.log(chalk.greenBright("Guru BK model check successful:"), guru_bk)
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 guru_bk_model: guru_bk
//             }
//         })
//     }
//     catch (error) {
//         next(error)
//     }
// }

// export const check_wali_kelas_model_controller = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const wali_kelas = await check_service.check_wali_kelas_model_service()
//         console.log(chalk.greenBright("Wali kelas model checked successfully."), wali_kelas)
//         res.status(200).json({
//             status: "success",
//             data: {
//                 wali_kelas_model: wali_kelas
//             }
//         })
//     } 
//     catch (error) {
//         next(error)
//     }
// }

// export const check_kelas_model_controller = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const kelas = await check_service.check_kelas_model_service()
//         console.log(chalk.greenBright("Kelas model checked successfully."), kelas)
//         res.status(200).json({
//             status: "success",
//             data: {
//                 kelas_model: kelas
//             }
//         })
//     } 
//     catch (error) {
//         next(error)
//     }
// }

// export const check_siswa_model_controller = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const siswa = await check_service.check_siswa_model_service()
//         console.log(chalk.greenBright("Wali kelas model checked successfully."), siswa)
//         res.status(200).json({
//             status: "success",
//             data: {
//                 siswa_model: siswa
//             }
//         })
//     } 
//     catch (error) {
//         next(error)
//     }
// }

import type { Request, Response, NextFunction } from 'express'
import { CheckDBService } from './check_db.service'
import chalk from 'chalk'

export class CheckDBController {
    private checkDbController: CheckDBService
    constructor() {
        this.checkDbController = new CheckDBService()
    }

    public Guru = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const guru = await this.checkDbController.Guru()
            console.log(chalk.greenBright("[Check DB] Received request to get all guru"), guru)
            res.status(200).json({
                message: "Received request to get all guru",
                data: guru
            })
        } 
        catch (error) {
            next
            (error)
        }
    }
    public GuruBK = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const guru_bk = await this.checkDbController.GuruBK()
            console.log(chalk.greenBright("[Check DB] Received request to get all guru"), guru_bk)
            res.status(200).json({
                message: "Received request to get all guru ",
                data: guru_bk
            })
        } 
        catch (error) {
            next
            (error)
        }
    }
    public WaliKelas = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const wali_kelas = await this.checkDbController.WaliKelas()
            console.log(chalk.greenBright("[Check DB] Received request to get all guru bk"), wali_kelas)
            res.status(200).json({
                message: "Received request to get all wali kelas",
                data: wali_kelas
            })
        } 
        catch (error) {
            next
            (error)
        }
    }
    public Kelas = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const kelas = await this.checkDbController.Kelas()
            console.log(chalk.greenBright("[Check DB] Received request to get all kelas"), kelas)
            res.status(200).json({
                message: "Received request to get all kelas",
                data: kelas
            })
        } 
        catch (error) {
            next
            (error)
        }
    }
    public Siswa = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const siswa = await this.checkDbController.Siswa()
            console.log(chalk.greenBright("[Check DB] Received request to get all guru"), siswa)
            res.status(200).json({
                message: "Received request to get all siswa",
                data: siswa
            })
        } 
        catch (error) {
            next
            (error)
        }
    }
}