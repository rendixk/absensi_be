import { prisma } from "../../../config/prisma"

export class SiswaProfileRepo {
    public async findSiswaId(siswa_id: number) {
        const data_siswa = await prisma.siswa.findUnique({
            where: { id: siswa_id }
        })
        return data_siswa
    }

    public async editSiswaProfile(siswa_id: number, data: {
        username: string,
        nama_lengkap: string,
        nis: string,
        nomor_wali: string,
        avatar: string
    }) {
        const data_siswa = await prisma.siswa.update({
            where: { id: siswa_id },
            data: data
        })
        return data_siswa
    }
}