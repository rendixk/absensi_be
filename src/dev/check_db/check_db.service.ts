import { prisma } from "../../config/prisma"

export class CheckDBService {
    public async Guru() {
        const data_guru = await prisma.guru.findMany({
            omit: { password: true }
        })
        const total_guru = await prisma.guru.count()

        return { total_guru, data_guru }
    }
    public async GuruBK() {
        const data_guru_bk = await prisma.guru_bk.findMany({
            omit: { password: true }
        })
        const total_guru_bk = await prisma.guru_bk.count()

        return { total_guru_bk, data_guru_bk }
    }
    public async WaliKelas() {
        const data_wali_kelas = await prisma.wali_kelas.findMany({
            omit: { password: true }
        })
        const total_wali_kelas = await prisma.wali_kelas.count()

        return { total_wali_kelas, data_wali_kelas }
    }
    public async Kelas() {
        const data_kelas = await prisma.kelas.findMany({
            omit: { password: true },
            include: { wali_kelas: { omit: { password: true } }, siswa: { omit: { password: true } } }
        })
        const total_kelas = await prisma.kelas.count()

        return { total_kelas, data_kelas }
    }
    public async Siswa() {
        const data_siswa = await prisma.siswa.findMany({
            omit: { password: true }
        })
        const total_siswa = await prisma.siswa.count()

        return { total_siswa, data_siswa }
    }
}