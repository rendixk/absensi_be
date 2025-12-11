import { prisma } from "../../../config/prisma"

export class GuruRepository {
    async findMany() {
        return prisma.guru.findMany()
    }

    async findUnique(id: number) {
        return prisma.guru.findUnique({
            where: { id },
        })
    }
}

export class KelasRepostitory {
    async findMany() {
        return prisma.kelas.findMany({
            include: { wali_kelas: true, siswa: true }
        })
    }

    async findUnique(id: number) {
        return prisma.kelas.findUnique({
            where: { id },
        })
    }
}

export class WaliKelasRepository {
    async findMany() {
        return prisma.wali_kelas.findMany()
    }

    async findUnique(id: number) {
        return prisma.wali_kelas.findUnique({
            where: { id },
        })
    }
}

export class SiswaRepository {
    async findMany() {
        return prisma.siswa.findMany()
    }

    async findUnique(id: number) {
        return prisma.siswa.findUnique({
            where: { id },
        })
    }
}

export class GuruBKRepository {
    async findMany() {
        return prisma.guru_bk.findMany()
    }

    async findUnique(id: number) {
        return prisma.guru_bk.findUnique({
            where: { id },
        })
    }
}