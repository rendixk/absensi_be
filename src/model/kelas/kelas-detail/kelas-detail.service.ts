import { detail_kelas_repo } from "./kelas-detail.repo"
import ErrorOutput from '../../../utils/errorOutput'
import chalk from 'chalk'

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