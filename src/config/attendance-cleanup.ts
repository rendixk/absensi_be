import { prisma } from "./prisma"
import { Status_Kehadiran } from "../generated"
import chalk from "chalk"

export const cleanup_forgotten_clock_out = async () => {
    const start_of_today = new Date()
    start_of_today.setHours(0, 0, 0, 0)

    const result = await prisma.absensi.updateMany({
        where: {
            tanggal: {
                gte: start_of_today
            },
            status: Status_Kehadiran.hadir,
            clock_in: { not: null },
            clock_out: null
        },
        data: {
            status: Status_Kehadiran.missing
        }
    })

    console.log(chalk.blueBright(`[Cleanup] Successfully marked ${result.count} records as MISSING`))
}