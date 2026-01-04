import { prisma } from "./prisma"
import { Status_Kehadiran } from "../generated"
import chalk from "chalk"

export const cleanup_forgotten_clock_out = async () => {
    const start_of_today = new Date()
    start_of_today.setHours(0, 0, 0, 0)

    const forgotten_absensi = await prisma.absensi.findMany({
        where: {
            tanggal: {
                gte: start_of_today
            },
            status: Status_Kehadiran.hadir,
            clock_in: { not: null },
            clock_out: null
        },
        select: { id: true, siswa_id: true, kelas_id: true }
    })

    if(forgotten_absensi.length === 0) {
        console.log(chalk.blueBright(`[Cron Job] No forgotten clock-out records found today.`));
        return { count: 0 }
    }

    const ids_to_update = forgotten_absensi.map(r => r.id)

    const update_result = await prisma.absensi.updateMany({
        where: { id: { in: ids_to_update } },
        data:{ status: Status_Kehadiran.missing }
    })

    console.log(chalk.blueBright(`[Cron Job Success] Updated ${update_result.count} records to Missing (Forgotten Clock-Out).`))
    return { count: update_result.count }
}