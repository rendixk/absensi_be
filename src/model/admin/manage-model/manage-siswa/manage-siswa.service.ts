import { ManageSiswaRepository } from "./manage-siswa.repo"
import ErrorOutput from '../../../../utils/errorOutput'
import chalk from "chalk"

export class ManageSiswaService {
    private manageSiswa: ManageSiswaRepository
    constructor() {
        this.manageSiswa = new ManageSiswaRepository()
    }

    public async fetchAllSiswa() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Siswa data..."))
        const siswa = await this.manageSiswa.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Siswa data."), siswa)
        return siswa
    }

    public async fetchSiswaById(id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Fetching Siswa data with ID: ${id}`))
        const siswa_id = await this.manageSiswa.findUnique(id)
        if(!siswa_id) {
            console.log(chalk.redBright(`[Backend Service] Siswa data with ID: ${id} not found.`))
            throw new ErrorOutput(`Siswa data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Siswa data with ID: ${id}`), siswa_id)
        return siswa_id
    }
}