import type { Request, Response, NextFunction } from "express"
import { prisma } from "../../config/prisma"
import chalk from "chalk"

export const reset_db_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Resetting database..."))
        const table_to_truncate = [
            "surat_peringatan",
            "qr_token",
            "absensi",
            "rekap_absensi",
            "siswa",
            "kelas",
            "wali_kelas",
            "guru",
            "guru_bk",
            "admin",
          ]

        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`
        for (const table of table_to_truncate) {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${table}`)
        }
        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`

        console.log(chalk.greenBright("Database reset successfully."))
        res.status(200).json({
            status: "success",
            message: "Database reset successfully."
        })
    } 
    catch (error) {
        next(error)
    }
}