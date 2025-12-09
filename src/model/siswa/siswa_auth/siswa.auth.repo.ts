import { prisma } from "../../../config/prisma"
import type { create_siswa_repo_input } from "../interface/siswa_interface"

export const find_siswa_username_repo = (username: string) => {
    return prisma.siswa.findUnique({
        where: { username },
        include: {
            kelas: { select: { nama_kelas: true } }
        }
    })
}

export const create_siswa_account_repo = (data: create_siswa_repo_input) => {
    return prisma.siswa.create({
        data: data
    })
}