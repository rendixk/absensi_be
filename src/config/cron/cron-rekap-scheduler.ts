import cron from "node-cron"
import chalk from "chalk"
import { prisma } from "../prisma"
import { generate_monthly_rekap_service } from "../../model/guru_bk/guru-bk-rekap-absensi/guru-bk-rekap-absensi.service"

const run_monthly_rekap_scheduler = async () => {
    console.log(chalk.blueBright('[SCHEDULER] Starting Monthly Rekap Generation'))

    const today = new Date()
    const target_bulan = today.getMonth() === 0 ? 12 : today.getMonth()
    const target_tahun = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear()

    const all_kelas = await prisma.kelas.findMany({ select: { id: true } })

    const default_guru_bk_id = 1

    for (const kelas of all_kelas) {
        try {
            await generate_monthly_rekap_service(
                kelas.id,
                target_bulan,
                target_tahun,
                default_guru_bk_id
            )
            console.log(chalk.green(`✔ Rekap generated for Kelas ${kelas.id} (${target_bulan}/${target_tahun})`))
        } 
        catch (error: any) {
            console.error(chalk.red(`❌ Failed to generate rekap for Kelas ${kelas.id}: ${error.message}`))
        }

        console.log(chalk.greenBright(`[SCHEDULER] Monthly Rekap Generation Finished`))
    }
}

export const start_rekap_absensi_scheduler = () => {
    cron.schedule('0 1 2 * *', run_monthly_rekap_scheduler, {
        timezone: 'Asia/Jakarta'
    })

    console.log(chalk.blueBright('⏱️ Monthly Rekap Scheduler Activated: Running on 1st day of month at 02:00 AM WIB.'))
}