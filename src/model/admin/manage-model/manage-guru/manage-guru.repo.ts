import { prisma } from "../../../../config/prisma"

export class ManageGuruRepository {
    public async findMany() {
        return prisma.guru.findMany()
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