import { prisma } from "../../../config/prisma"
import type { create_wali_kelas_interface } from "../interface/wali_kelas.interface"

//for login
export const find_wali_kelas_username_repo = (username: string) => {
    return prisma.wali_kelas.findUnique({
        where: { username },
        include: {
            kelas: {
                select: { nama_kelas: true }
            }
        }
    })
}

//for register
export const create_wali_kelas_account = (data: create_wali_kelas_interface) => {
    return prisma.wali_kelas.create({
        data: data
    })
}