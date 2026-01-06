import { detail_kelas_repo, rekap_presensi_repo } from "./kelas-detail.repo"
import ErrorOutput from '../../../utils/errorOutput'
import chalk from 'chalk'
import { find_kelas_id } from "../kelas_auth/kelas.auth.repo"

export const detail_kelas_service = async (user_id: number) => {
    const detail_kelas = await detail_kelas_repo(user_id)

    if(!detail_kelas) {
        console.log(chalk.red("[Backend Service] kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }
    
    const active_wali_kelas = detail_kelas.wali_kelas_id === user_id
    const active_guru = detail_kelas.guru_id === user_id

    if(!active_guru && !active_wali_kelas) {
        console.log(chalk.redBright("[Backend Service] Access denied: User is not the Wali Kelas or active Guru"))
        throw new ErrorOutput("You don't have active access to this class. Please login first.", 401)
    }

    return detail_kelas
}

export const rekap_presensi_service = async (kelas_id: number) => {
    const data_kelas = await find_kelas_id(kelas_id)
    if(!data_kelas) {
        console.error(chalk.redBright("[Error] Kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }

    const rekap_presensi_kelas = await rekap_presensi_repo(kelas_id)
    if(!rekap_presensi_kelas) {
        console.error(chalk.redBright("[Error] Siswa not found"))
        throw new ErrorOutput("Siswa not found", 404)
    }

    console.log(chalk.greenBright(`[Backend Service] Successfull get rekap presensi for kelas ${kelas_id}`))

    return rekap_presensi_kelas
}