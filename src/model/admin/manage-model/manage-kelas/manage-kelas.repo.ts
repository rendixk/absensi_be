import { prisma } from "../../../../config/prisma"

export class ManageKelasRepository {
    public async findMany() {
        const data_kelas = await prisma.kelas.findMany({
            include: {
                siswa: { omit: { password: true } },
                wali_kelas: { omit: { password: true } }
            },
            omit: { password: true }
        })
        const total_kelas = await prisma.kelas.count()

        return { data_kelas, total_kelas }
        // return prisma.kelas.findMany({
        //     include: { wali_kelas: true, siswa: true }
        // })
    }

    public async findUnique(id: number) {
        return prisma.kelas.findUnique({
            where: { id },
            omit: { password: true }
        })
    }

    public async assignKelas(kelas_id: number, wali_kelas_id: number) {
        return prisma.kelas.update({
            where: { id: kelas_id },
            data: { wali_kelas_id }
        })
    }

    public async findKelasByWaliKelasId(wali_kelas_id: number) {
        return prisma.kelas.findFirst({
            where: { wali_kelas_id: wali_kelas_id }
        })
    }
}