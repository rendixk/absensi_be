import { prisma } from "../../config/prisma"
import { upsert_rekap_absensi_repo, find_rekap_data_repo } from "./rekap-absensi.repo"
import chalk from "chalk"

export const rekap_absensi_service = async (kelas_id: number, minggu: number, bulan: number, tahun: number) => {
    console.log(chalk.blue(`[Service] Syncing Rekap for Kelas ${kelas_id} - Week ${minggu}`))

    let start_date: Date
    let end_date: Date

    if (minggu === 0) { // Bulanan
        start_date = new Date(tahun, bulan - 1, 1)
        end_date = new Date(tahun, bulan, 0, 23, 59, 59);
    } else { // Mingguan
        const start_day = (minggu - 1) * 7 + 1
        start_date = new Date(tahun, bulan - 1, start_day)
        end_date = new Date(tahun, bulan - 1, start_day + 6, 23, 59, 59)
    }

    const students = await prisma.siswa.findMany({ where: { kelas_id } })

    for (const student of students) {
        const logs = await prisma.absensi.findMany({
            where: {
                siswa_id: student.id,
                tanggal: { gte: start_date, lte: end_date }
            }
        })

        const counts = { total_hadir: 0, total_sakit: 0, total_izin: 0, total_alpha: 0, total_missing: 0 }

        logs.forEach(log => {
            if (log.status === 'hadir') {
                if (log.clock_in && log.clock_out) {
                    counts.total_hadir++
                } else if (log.clock_in && !log.clock_out) {
                    counts.total_missing++ 
                } else {
                    counts.total_alpha++
                }
            } 
            else if (log.status === 'sakit') counts.total_sakit++
            else if (log.status === 'izin') counts.total_izin++
            else if (log.status === 'alfa') counts.total_alpha++
            else if (log.status === 'missing') counts.total_missing++
        });

        await upsert_rekap_absensi_repo(student.id, kelas_id, minggu, bulan, tahun, counts)
    }

    return await find_rekap_data_repo({ kelas_id, minggu_ke: minggu, bulan, tahun })
}