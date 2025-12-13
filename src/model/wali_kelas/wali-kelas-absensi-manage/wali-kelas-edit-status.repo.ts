import { prisma } from "../../../config/prisma"
import { Status_Kehadiran } from "../../../generated"

export const find_absensi_for_edit_by_id = (id: number) => {
    return prisma.absensi.findUnique({
        where: { id },
        select: { id: true, kelas_id: true, clock_in: true, status: true, siswa_id: true }
    })
}

export const edit_status_absensi_repo = (absensi_id: number, status: Status_Kehadiran) => {
    return prisma.absensi.update({
        where: { id: absensi_id },
        data: {
            status: status
        }
    })
}