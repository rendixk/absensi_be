import { detail_kelas_repo } from "./kelas-detail.repo"
import ErrorOutput from '../../../utils/errorOutput'
import chalk from 'chalk'

export const detail_kelas_service = async (user_id: number) => {
    const detail_kelas = await detail_kelas_repo(user_id)

    if(!detail_kelas) {
        console.log(chalk.red("kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }

    return detail_kelas
}