import { find_daily_attendance_log_repo } from "./rekap.repo"
import { prisma } from "../../../config/prisma"
import chalk from "chalk"

export const rekap_presensi_service = async (kelas_id: number, target_date: string) => {
    const students = await prisma.siswa.findMany({
        where: { kelas_id }, 
        select: { id: true, nama_lengkap: true, nis: true }
    })

    const logs = await find_daily_attendance_log_repo(kelas_id, target_date)
    console.log(chalk.blueBright(`[Service] Mapping ${students.length} students to ${logs.length} logs found.`));

    return students.map(student => {
        const attendance = logs.find(log => log.siswa_id === student.id);

        return {
            id: student.id,
            nama: student.nama_lengkap,
            nis: student.nis,
            status: attendance ? attendance.status : "alfa",
            clock_in: attendance?.clock_in || "-",
            clock_out: attendance?.clock_out || "-",
            is_complete: !!(attendance?.clock_in && attendance?.clock_out)
        }
    })
}

// export const generate_rekap_service = async (kelas_id: number, minggu: number, bulan: number, tahun: number) => {
//     const students = await prisma.siswa.findMany({ where: { kelas_id } })

//     const presensi_logs = await find_attendance_repo(kelas_id, minggu, bulan, tahun)

//     const result = []

//     for (const student of students) {
//         const student_log = presensi_logs.filter(logs => logs.siswa_id === student.id)
//         const counts = { 
//             total_hadir: 0, 
//             total_sakit: 0, 
//             total_izin: 0, 
//             total_alfa: 0, 
//             total_missing: 0 
//         }

//         student_log.forEach(log => {
//             if(log.status === "hadir") {
//                 if (log.clock_in && log.clock_out) counts.total_hadir++
//                 else if (log.clock_in && !log.clock_out) counts.total_missing++
//             }
//             else {
//                 if (log.status === 'sakit') counts.total_sakit++
//                 if (log.status === 'izin') counts.total_izin++
//                 if (log.status === 'alfa') counts.total_alfa++
//                 if (log.status === 'missing') counts.total_missing++
//             }
//         })

//         await save_rekap_presensi_repo({
//             siswa_id: student.id,
//             kelas_id: kelas_id,
//             minggu: minggu,
//             bulan: bulan,
//             tahun: tahun,
//             ...counts
//         })

//         result.push({
//             tanggal: new Date(),
//             siswa: student.id,
//             nama: student.nama_lengkap,
//             nis: student.nis,
//             rekap: counts
//         })
//     }

//     return result
// }