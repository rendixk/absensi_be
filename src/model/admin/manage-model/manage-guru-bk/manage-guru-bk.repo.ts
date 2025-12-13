import { prisma } from "../../../../config/prisma"

export class ManageGuruBKRepository {
    public async findMany() {
        return prisma.guru_bk.findMany()
    }

    public async findUnique(id: number) {
        return prisma.guru_bk.findUnique({
            where: { id },
        })
    }
}