import { prisma } from "../../../../config/prisma"

export class ManageSiswaRepository {
    public async findMany() {
        return prisma.siswa.findMany()
    }

    public async findUnique(id: number) {
        return prisma.siswa.findUnique({
            where: { id },
        })
    }
}