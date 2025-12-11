import { prisma } from "../../../config/prisma"
import { 
    aggregate_absensi_status_repo, 
    find_monthly_rekap_by_kelas_repo, 
    upsert_rekap_absensi_repo 
} from "./guru-bk-rekap-absensi.repo"
import type { AggregationResult } from "./interface/guru-bk-rekap-absensi.interface"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const generate_monthly_rekap_service = async (
    kelas_id: number, 
    bulan: number, 
    tahun: number,
    guru_bk_id: number
) => {
    const start_date = new Date(tahun, bulan - 1, 1)
    const end_date = new Date(tahun, bulan, 0)

    const students = await prisma.siswa.findMany({
        where: { kelas_id },
        select: { id: true, nama_lengkap: true }
    })

    if (students.length === 0) {
        console.log(chalk.redBright("No students found in kelas ID:"), kelas_id)
        throw new ErrorOutput(` No students found for the specified class ID: ${kelas_id}` , 404)
    }

    const rekap_results = []

    for (const student of students) {
        const attendance_counts: AggregationResult[] = await aggregate_absensi_status_repo(
            student.id, kelas_id, start_date, end_date
        )

        const counts = { total_hadir: 0, total_sakit: 0, total_izin: 0, total_alpha: 0 }

        for (const record of attendance_counts) {
            const count = record._count.status

            if(record.status === 'hadir') counts.total_hadir = count
            if(record.status === 'sakit') counts.total_hadir = count
            if(record.status === 'izin') counts.total_hadir = count
            if(record.status === 'alfa') counts.total_hadir = count
        }

        await upsert_rekap_absensi_repo(
            student.id, kelas_id, bulan, tahun, guru_bk_id, counts
        )

        rekap_results.push(({ siswa: student.nama_lengkap, ...counts }))
    }
    
    console.log(chalk.greenBright(`[REKAP] Finished rekap for ${students.length} students in Kelas ${kelas_id}.`))
    return rekap_results
}

export const get_monthly_rekap_absensi_service = async (
    kelas_id: number,
    bulan: number,
    tahun: number
) => {
    const rekap_data = await find_monthly_rekap_by_kelas_repo(kelas_id, bulan, tahun)

    if(rekap_data.length === 0) {
        console.log(chalk.yellowBright(`[REKAP] No rekap data found for Kelas ${kelas_id} for ${bulan}/${tahun}.`))
        throw new ErrorOutput(`Monthly rekap for Kelas ${kelas_id} in ${bulan}/${tahun} not found.`, 404)
    }

    console.log(chalk.greenBright(`[REKAP] Retrieved rekap data for Kelas ${kelas_id} for ${bulan}/${tahun}.`), rekap_data)
    return rekap_data
}