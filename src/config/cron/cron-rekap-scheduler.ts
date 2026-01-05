import cron from "node-cron"
import chalk from "chalk"
import { prisma } from "../prisma"
import { rekap_absensi_service } from "../../model/rekap-absensi/rekap-absensi.service"

export const start_rekap_absensi_scheduler = () => {
    cron.schedule('0 1 2 * *', async () => {
        const now = new Date()
        const minggu = Math.ceil(now.getDate()/7)
        const bulan = now.getMonth() + 1
        const tahun = now.getFullYear()

        const all_kelas = await prisma.kelas.findMany({ select: { id: true } })

        for (const kelas of all_kelas) {
            try {
                await rekap_absensi_service(kelas.id, minggu, bulan, tahun)
                console.log(chalk.greenBright(`[CRON] Success rekap for kelas ${kelas.id}`), kelas.id)
            } 
            catch (error) {
                console.error(chalk.redBright(`[CRON] Failed for kelas ${kelas.id}`), kelas.id)
            }
        }
    })
}