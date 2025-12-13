import { prisma } from "../../../../config/prisma"

export class ManageWaliKelasRepository {
    async findMany() {
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

    async findUnique(id: number) {
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
}