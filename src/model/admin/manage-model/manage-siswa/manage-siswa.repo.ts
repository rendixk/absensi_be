import { prisma } from "../../../../config/prisma"

export class ManageSiswaRepository {
    public async findMany() {
        const data_siswa = await prisma.siswa.findMany({
            omit: { password: true }
        })
        const total_siswa = await prisma.siswa.count()
        return { data_siswa, total_siswa }
        // return prisma.siswa.findMany()
    }

    public async findUnique(id: number) {
        return prisma.siswa.findUnique({
            where: { id },
            omit: { password: true }
        })
    }
}