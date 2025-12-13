import { Status_Kehadiran } from "../../../../generated"

// Input data that received by client for clockin/out
export interface CheckInInput {
    kelas_id: number
    siswa_id: number
    qr_type: 'clock_in' | 'clock_out'
    qr_token: string // Needed to signed that token as "used" in DB
}

// Data that will save in absensi tabel
export interface AbsensiData {
    siswa_id: number
    kelas_id: number
    status: Status_Kehadiran
    clock_in: Date
    clock_out?: Date
}