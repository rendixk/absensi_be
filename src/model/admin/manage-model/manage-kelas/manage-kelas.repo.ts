import { prisma } from "../../../../config/prisma"

export class ManageKelasRepository {
    public async findMany() {
        return prisma.kelas.findMany({
            include: { wali_kelas: true, siswa: true }
        })
    }

    public async findUnique(id: number) {
        return prisma.kelas.findUnique({
            where: { id },
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