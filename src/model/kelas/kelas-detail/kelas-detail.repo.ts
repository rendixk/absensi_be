import { prisma } from "../../../config/prisma"

export const detail_kelas_repo = (user_id: number) => {
    return prisma.kelas.findFirst({
        where: {
            OR: [
                { guru_id: user_id },
                { wali_kelas_id: user_id }
            ]
        },
        include: {
            wali_kelas: { omit: { password: true } },
            siswa: { omit: { password: true }, select: { absensi: { select: { status: true } } } }
        }
    })
}

export const presensi_repo = (kelas_id: number) => {
    return prisma.absensi.findMany({
        where: { kelas_id },
        select: { 
            siswa: {
                select: { nama_lengkap: true }
            },
            status: true
        }
    })
}