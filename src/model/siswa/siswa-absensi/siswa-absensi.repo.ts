import { prisma } from "../../../config/prisma"
import type { AbsensiData } from "./interface/siswa-absensi.interface"
import { Status_Kehadiran } from "../../../generated"

// Function for create new absensi record (only for clock-in)
export const create_absensi_record = (data: AbsensiData) => {
    return prisma.absensi.create({
        data: {
            siswa_id: data.siswa_id,
            kelas_id: data.kelas_id,
            status: Status_Kehadiran.hadir, // Explicitly 'hadir' when clock-in successful
            clock_in: data.clock_in
        }
    })
}

// Function to searching for absensi today (based on Date, Siswa, and Kelas)
export const find_absensi_today = (siswa_id: number, kelas_id: number) => {
    const start_of_day = new Date()
    start_of_day.setHours(0, 0, 0, 0)

    // Searching for record that created today
    return prisma.absensi.findFirst({
        where: {
            siswa_id: siswa_id,
            kelas_id: kelas_id,
            tanggal: {
                gte: start_of_day
            }
        }
    })
}

// Function to update Clock-out time
export const update_absensi_clock_out = (absensi_id: number, clock_out_time: Date) => {
    return prisma.absensi.update({
        where: { id: absensi_id },
        data: {
            clock_out: clock_out_time
            // Status not changed; still 'hadir' if clock-out successful
        }
    })
}