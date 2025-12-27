import { prisma } from "../../../config/prisma"

export class WKManageKelasRepo {
    public async findKelasWK(wali_kelas_id: number) {
        const data_kelas = await prisma.kelas.findUnique({ 
            where: { wali_kelas_id },
            include: { siswa: { omit: { password: true } } }
        })

        if(!data_kelas) return null

        const total_siswa = await prisma.siswa.count({
            where: { kelas_id: data_kelas.id }
        })

        return { total_siswa, data_kelas }
    }
}