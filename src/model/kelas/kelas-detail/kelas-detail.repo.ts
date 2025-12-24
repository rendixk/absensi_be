import { prisma } from "../../../config/prisma"

export const detail_kelas_repo = (id: number) => {
    return prisma.kelas.findUnique({
        where: { id },
        include: {
            wali_kelas: {
                omit: { password: true }
            },
            siswa: {
                omit: { password: true }
            }
        }
    })
}