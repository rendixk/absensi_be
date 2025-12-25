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