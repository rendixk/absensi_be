// import { cleanup_forgotten_clock_out } from "../attendance-cleanup"
import cron from "node-cron"
import chalk from "chalk"
import { prisma } from "../prisma"

export const start_trace_forgotten_clock_out_scheduler = () => {
    cron.schedule("0 16 * * *", async () => {
        try {
            console.log(chalk.yellowBright("[Scheduler] Closing attendance for today..."))

            const start_date = new Date()
            start_date.setHours(0, 0, 0, 0)

            const end_date = new Date()
            end_date.setHours(23, 59, 59, 999)

            await prisma.absensi.updateMany({
                where: {
                    tanggal: { gte: start_date, lte: end_date },
                    status: 'hadir',
                    clock_out: null,
                    clock_in: { not: null }
                },
                data: {
                    status: 'missing'
                }
            })
            console.log(chalk.greenBright("[Scheduler] Attendance closed for today."))
        }
        catch (error) {
            console.error(chalk.redBright("[Scheduler] CRON Error:"), error)
        }
    }, { timezone: "Asia/Jakarta" })
}