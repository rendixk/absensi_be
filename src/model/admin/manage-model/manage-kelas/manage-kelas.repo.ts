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
}