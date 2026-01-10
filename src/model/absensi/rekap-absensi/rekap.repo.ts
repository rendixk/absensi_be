import { prisma } from "../../../config/prisma"

interface DataPresensi {
    siswa_id: number,
    kelas_id: number,
    minggu: number,
    bulan: number,
    tahun: number
}

export const find_attendance_repo = (kelas_id: number, minggu: number, bulan: number, tahun: number) => {
    return prisma.absensi.findMany({
        where: {
            kelas_id,
            minggu,
            bulan,
            tahun
        }
    })
}

export const save_rekap_presensi_repo = (data: DataPresensi) => {
    return prisma.rekap_absensi.upsert({
        where: {
            siswa_id_kelas_id_minggu_bulan_tahun: {
                siswa_id: data.siswa_id,
                kelas_id: data.kelas_id,
                minggu: data.minggu,
                bulan: data.bulan,
                tahun: data.tahun
            }
        },
        update: data,
        create: data
    })
}