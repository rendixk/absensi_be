import chalk from "chalk";
import { prisma } from "../../../config/prisma"

export const find_daily_attendance_log_repo = async (kelas_id: number, target_date: string) => {
    const start_of_day = new Date(`${target_date}T00:00:00Z`);
    const end_of_day = new Date(`${target_date}T23:59:59Z`);

    console.log(chalk.blueBright(`[Repo] Searching logs for class ${kelas_id} on date ${target_date}`));

    return prisma.absensi.findMany({
        where: {
            kelas_id,
            tanggal: {
                gte: start_of_day,
                lte: end_of_day
            }
        }
    })
}

// interface DataPresensi {
//     siswa_id: number,
//     kelas_id: number,
//     minggu: number,
//     bulan: number,
//     tahun: number
// }

// export const find_attendance_repo = (kelas_id: number, minggu: number, bulan: number, tahun: number) => {
//     return prisma.absensi.findMany({
//         where: {
//             kelas_id,
//             minggu,
//             bulan,
//             tahun
//         }
//     })
// }

// export const save_rekap_presensi_repo = (data: DataPresensi) => {
//     return prisma.rekap_absensi.upsert({
//         where: {
//             siswa_id_kelas_id_minggu_bulan_tahun: {
//                 siswa_id: data.siswa_id,
//                 kelas_id: data.kelas_id,
//                 minggu: data.minggu,
//                 bulan: data.bulan,
//                 tahun: data.tahun
//             }
//         },
//         update: data,
//         create: data
//     })
// }