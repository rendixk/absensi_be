import type { NextFunction, Request, Response } from 'express'
import * as check_service from './check_db.service'
import chalk from 'chalk'

export const check_admin_model_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await check_service.check_admin_model_service()
        console.log(chalk.greenBright("Admin model check successful:"), admin)
        res.status(200).json({
            status: 'success',
            data: {
                admin_model: admin
            }
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const check_guru_model_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const guru = await check_service.check_guru_model_service()
        console.log(chalk.greenBright("Guru model check successful:"), guru)
        res.status(200).json({
            status: 'success',
            data: {
                guru_model: guru
            }
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const check_guru_bk_model_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const guru_bk = await check_service.check_guru_bk_model_service()
        console.log(chalk.greenBright("Guru BK model check successful:"), guru_bk)
        res.status(200).json({
            status: 'success',
            data: {
                guru_bk_model: guru_bk
            }
        })
    }
    catch (error) {
        next(error)
    }
}

export const check_wali_kelas_model_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wali_kelas = await check_service.check_wali_kelas_model_service()
        console.log(chalk.greenBright("Wali kelas model checked successfully."), wali_kelas)
        res.status(200).json({
            status: "success",
            data: {
                wali_kelas_model: wali_kelas
            }
        })
    } 
    catch (error) {
        next(error)
    }
}

export const check_kelas_model_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const kelas = await check_service.check_kelas_model_service()
        console.log(chalk.greenBright("Kelas model checked successfully."), kelas)
        res.status(200).json({
            status: "success",
            data: {
                kelas_model: kelas
            }
        })
    } 
    catch (error) {
        next(error)
    }
}

export const check_siswa_model_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const siswa = await check_service.check_siswa_model_service()
        console.log(chalk.greenBright("Wali kelas model checked successfully."), siswa)
        res.status(200).json({
            status: "success",
            data: {
                siswa_model: siswa
            }
        })
    } 
    catch (error) {
        next(error)
    }
}