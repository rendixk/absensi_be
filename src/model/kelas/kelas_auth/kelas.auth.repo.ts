import { prisma } from "../../../config/prisma"
import type { create_kelas_interface } from "../interface/kelas_interface"

export const find_nama_kelas_repo = (nama_kelas: string) => {
    return prisma.kelas.findUnique({
        where: { nama_kelas },
        include: {
            wali_kelas: {
                select: {
                    username: true
                }
            },
            guru: {
                select: {
                    username: true
                }
            },
            siswa: { 
                select: {
                    username: true,
                    nama_lengkap: true,
                    nis: true,
                    nomor_wali: true
                }
            }
        }
    })
}

export const find_kelas_id = (kelas_id: number) => {
    return prisma.kelas.findUnique({
        where: { id: kelas_id }
    })
}

export const create_kelas_repo = (data: create_kelas_interface) => {
    return prisma.kelas.create({
        data: data
    })
}

export const guru_logout_repo = (kelas_id: number) => {
    return prisma.kelas.update({
        where: { id: kelas_id },
        data: {
            guru_id: null
        }
    })
}

export const edit_nama_kelas_repo = (nama_kelas: string) => {
    return prisma.kelas.update({
        where: { nama_kelas },
        data: { 
            nama_kelas,
            updated_at: new Date()
        }
    })
}