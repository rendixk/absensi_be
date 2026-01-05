import { prisma } from "../../config/prisma"

export interface CountAbsenceStatus {
    total_hadir: number
    total_sakit: number
    total_izin: number
    total_alpha: number
    total_missing: number
}

export const upsert_rekap_absensi_repo = (
    siswa_id: number,
    kelas_id: number,
    minggu_ke: number,
    bulan: number,
    tahun: number,
    counts: CountAbsenceStatus
) => {
    return prisma.rekap_absensi.upsert({
        where: {
            siswa_id_kelas_id_minggu_ke_bulan_tahun: {
                siswa_id,
                kelas_id,
                minggu_ke,
                bulan,
                tahun
            }
        },
        update: { ...counts },
        create: {
            siswa_id,
            kelas_id,
            minggu_ke,
            bulan,
            tahun,
            ...counts
        }
    })
}

export const find_rekap_data_repo = (filter: any) => {
    return prisma.rekap_absensi.findMany({
        where: filter,
        include: {
            siswa: {
                select: {
                    nama_lengkap: true,
                    nis: true,
                    avatar: true,
                    nomor_wali: true
                }
            }
        },
        orderBy: {
            siswa: { nama_lengkap: "asc" }
        }
    })
}