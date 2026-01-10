import { detail_kelas_repo, presensi_repo } from "./kelas-detail.repo"
import ErrorOutput from '../../../utils/errorOutput'
import chalk from 'chalk'
import { find_kelas_id } from "../kelas_auth/kelas.auth.repo"

export const detail_kelas_service = async (user_id: number) => {
    const detail_kelas = await detail_kelas_repo(user_id)

    if(!detail_kelas) {
        console.log(chalk.red("[Backend Service] kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }
    
    const active_wali_kelas = detail_kelas.wali_kelas_id === user_id
    const active_guru = detail_kelas.guru_id === user_id

    if(!active_guru && !active_wali_kelas) {
        console.log(chalk.redBright("[Backend Service] Access denied: User is not the Wali Kelas or active Guru"))
        throw new ErrorOutput("You don't have active access to this class. Please login first.", 401)
    }

    return detail_kelas
}

export const rekap_presensi_service = async (kelas_id: number) => {
    const data_kelas = await find_kelas_id(kelas_id)
    if(!data_kelas) {
        console.error(chalk.redBright("[Error] Kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }

    const rekap_presensi_kelas = await presensi_repo(kelas_id)
    if(!rekap_presensi_kelas) {
        console.error(chalk.redBright("[Error] Siswa not found"))
        throw new ErrorOutput("Siswa not found", 404)
    }

    // console.log(chalk.greenBright(`[Backend Service] Successfull get rekap presensi for kelas ${kelas_id}`))
    return rekap_presensi_kelas
}

// export const rekap_presensi_service = async (kelas_id: number) => {
//     // identify kelas id automatically
//     const user_kelas = await prisma.kelas.findFirst({
//         where: { OR: [{ wali_kelas_id: kelas_id }, { guru_id: kelas_id }] }
//     })
//     if(!user_kelas) {
//         console.log(chalk.red("[Backend Service] kelas not found"))
//         throw new ErrorOutput("Kelas not found", 404)
//     }

//     const target_id_kelas = user_kelas.id

//     // Detect current time 
//     const now = new Date()
//     const tahun = now.getFullYear()
//     const bulan = now.getMonth() + 1
//     const today_str = now.toISOString().split("T")[0]
//     const minggu = Math.ceil(now.getDate()/7)

//     //Count range 7 days for this week
//     const start_day = (minggu - 1) * 7 + 1
//     const start = new Date(tahun, bulan - 1, start_day)
//     const end = new Date(tahun, bulan - 1, start_day + 6, 23, 59, 59)

//     const siswa_list = await prisma.siswa.findMany({
//         where: { kelas_id: target_id_kelas },
//         include: {
//             absensi: {
//                 where: { tanggal: { gte: start, lte: end } },
//             }
//         }
//     })

//     return siswa_list.map(siswa => {
//         const stats = { hadir: 0, sakit: 0, izin: 0, alfa: 0, missing: 0 }
//         let current_status = "Have not checked yet"
//         siswa.absensi.forEach(presensi => {
//             const record_date = presensi.tanggal.toISOString().split("T")[0]
//             const is_today = record_date === today_str

//             if(presensi.status === "hadir" && presensi.clock_in && presensi.clock_out) {
//                 stats.hadir += 1
//                 current_status = "hadir"
//             }
//             else if (presensi.status === "hadir" && presensi.clock_in && !presensi.clock_out) {
//                 stats.missing += 1
//                 current_status = "hadir"
//             }
//             else if (presensi.status === "sakit") {
//                 stats.sakit += 1
//                 current_status = "sakit"
//             }
//             else if (presensi.status === "izin") {
//                 stats.izin += 1
//                 current_status = "izin"
//             }
//             else if (presensi.status === "alfa") {
//                 stats.alfa += 1
//                 current_status = "alfa"
//             }

//             return {
//                 id: siswa.id,
//                 nama: siswa.nama_lengkap,
//                 nis: siswa.nis,
//                 avatar: siswa.avatar,
//                 status: current_status,
//                 // weekly_summary: stats
//             }
//         })
//     })
// }