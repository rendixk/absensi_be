import { prisma } from "../../../config/prisma"
import type { 
    AggregationResult, 
    CountAbsenceStatus,
} from "./interface/guru-bk-rekap-absensi.interface"

// export const rekap_absensi_find_kelas_id_service = (kelas_id: number) => {
//     return prisma.kelas.findUnique({
//         where: { id: kelas_id }
//     })
// }

export const rekap_absensi_find_all_siswa_repo = (kelas_id: number) => {
    return prisma.siswa.findMany({
        where: { kelas_id },
        select: { id: true, nama_lengkap: true }
    })
}

export const aggregate_absensi_status_repo = (
    kelas_id: number, 
    siswa_id: number, 
    start_date: Date,
    end_date: Date
) => {
    return prisma.absensi.groupBy({
        by: ["status"],
        where: { 
            siswa_id,
            kelas_id,
            tanggal: { gte: start_date, lte: end_date }
        },
        _count: { status: true }
    }) as unknown as Promise<AggregationResult[]>
}

export const upsert_rekap_absensi_repo = (
    siswa_id: number,
    kelas_id: number,
    bulan: number,
    tahun: number,
    guru_bk_id: number,
    counts: CountAbsenceStatus
) => {
    return prisma.rekap_absensi.upsert({
        where: {
            siswa_id_kelas_id_bulan_tahun: {
                siswa_id,
                kelas_id,
                bulan,
                tahun
            }
        },
        update: { ...counts },
        create: {
            siswa_id,
            kelas_id,
            bulan,
            tahun,
            guru_bk_id,
            ...counts
        }
    })
}

export const find_monthly_rekap_by_kelas_repo = (kelas_id: number, bulan: number, tahun: number) => {
    return prisma.rekap_absensi.findMany({
        where: { 
            kelas_id,
            bulan,
            tahun
        },
        select: {
            siswa: {
                select: {
                    nama_lengkap: true,
                    kelas: {
                        select: {
                            nama_kelas: true
                        }
                    },
                    nis: true,
                    nomor_wali: true
                }
            }
        },
        orderBy: {
            siswa: { nama_lengkap: "asc" }
        }
    })
}