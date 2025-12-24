import { prisma } from "../../../../config/prisma"

export class ManageWaliKelasRepository {
    public async findMany() {
        const data_wali_kelas = await prisma.wali_kelas.findMany({
            include: {
                kelas: {
                    select: {
                        id: true,
                        nama_kelas: true,
                    }
                }
            },
            omit: { password: true }
        })
        const total_wali_kelas = await prisma.wali_kelas.count()
        
        return { data_wali_kelas, total_wali_kelas }
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
            omit: { password: true }
        })
    }

    public async delete(id: number) {
        return prisma.wali_kelas.delete({
            where: { id }
        })
    }
}