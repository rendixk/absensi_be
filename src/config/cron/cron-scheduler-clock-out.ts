import { cleanup_forgotten_clock_out } from "../attendance-cleanup"
import cron from "node-cron"
import chalk from "chalk"

export const start_trace_forgotten_clock_out_scheduler = () => {
    const CRON_SCHEDULE = '59 23 * * *'

    cron.schedule(CRON_SCHEDULE, async () => {
        try {
            console.log(chalk.yellowBright("[Schedular] Starting Daily Attendance Cleanup Job"))
            await cleanup_forgotten_clock_out()
            console.log(chalk.greenBright("[Schedular] Daily Attendance Cleanup Job Finished"))
        } 
        catch (error: any) {
            console.log(chalk.redBright("CRON JOB failed"), error)   
        }
    }, {
        timezone: "Asia/Jakarta"
    })

    console.log(chalk.greenBright(`[Scheduler] Cron Job scheduled to run daily at 23:59 WIB.`))
}