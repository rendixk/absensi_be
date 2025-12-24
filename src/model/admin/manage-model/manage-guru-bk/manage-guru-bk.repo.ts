import { prisma } from "../../../../config/prisma"

export class ManageGuruBKRepository {
    public async findMany() {
        const data_bk = await prisma.guru_bk.findMany({
            omit: { password: true }
        })
        const total_guru_bk = await prisma.guru_bk.count()
        return { data_bk, total_guru_bk }
    }

    public async findUnique(id: number) {
        return prisma.guru_bk.findUnique({
            where: { id },
            omit: { password: true }
        })
    }
    public async delete(id: number) {
        return prisma.guru_bk.delete({
            where: { id }
        })
    }
}