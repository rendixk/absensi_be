import { prisma } from "../../../../config/prisma"

export class ManageGuruRepository {
    public async findMany() {
        const data_guru = await prisma.guru.findMany()
        const total_guru = await prisma.guru.count()

        return { data_guru, total_guru }
    }

    public async findUnique(id: number) {
        return prisma.guru.findUnique({
            where: { id },
        })
    }

    public async delete(id: number) {
        return prisma.guru.delete({
            where: { id }
        })
    }
}