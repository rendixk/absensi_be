import { prisma } from "../../config/prisma"

export const check_admin_model_service = () => {
    return prisma.admin.findMany()
}

export const check_guru_model_service = () => {
    return prisma.guru.findMany()
}

export const check_guru_bk_model_service = () => {
    return prisma.guru_bk.findMany()
}

export const check_wali_kelas_model_service = () => {
    return prisma.wali_kelas.findMany()
}

export const check_siswa_model_service = () => {
    return prisma.siswa.findMany()
}

export const check_kelas_model_service = () => {
    return prisma.kelas.findMany({
        include: {
            wali_kelas: true
        }
    })
}