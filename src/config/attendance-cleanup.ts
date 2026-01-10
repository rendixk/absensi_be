import { prisma } from "./prisma"
import cron from "node-cron"
import chalk from "chalk"

export const start_attendance_cleanup = async () => {
    cron.schedule('0 16 * * *', async () => {
        console.log(chalk.yellow("[Cron] Running 4 PM Clock-out Enforcement..."));
        
        await prisma.absensi.updateMany({
            where: {
                clock_in: { not: null },
                clock_out: null,
                status: 'hadir'
            },
            data: { status: 'missing' }
        });

        console.log(chalk.green("[Cron] Daily cleanup finished."))
    }, { timezone: "Asia/Jakarta" })
}