import { prisma } from "../../config/prisma"

export const find_all_absensi_today_by_kelas_repo = (kelas_id: number) => {
    const start_of_day = new Date()
    start_of_day.setHours(0, 0, 0, 0)

    return prisma.absensi.findMany({
        where: { 
            kelas_id,
            tanggal: {
                gte: start_of_day
            }
        },
        include: {
            siswa: {
                select: { nama_lengkap: true, nis: true, avatar: true, nomor_wali: true }
            }
        },
        orderBy: {
            siswa_id: "asc"
        }
    })
}