import { prisma } from "../../../../config/prisma"

export class ManageWaliKelasRepository {
    public async findMany() {
        return prisma.wali_kelas.findMany({
            include: {
                kelas: {
                    select: {
                        id: true,
                        nama_kelas: true,
                    }
                }
            },
        })
    }

    public async findUnique(id: number) {
        return prisma.wali_kelas.findUnique({
            where: { id },
            include: {
                kelas: {
                    select: {
                        id: true,
                        nama_kelas: true,
                    }
                }
            },
        })
    }

    public async delete(id: number) {
        return prisma.wali_kelas.delete({
            where: { id }
        })
    }
}