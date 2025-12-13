import { ManageKelasRepository } from "./manage-kelas.repo"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageKelasService {
    private manageKelasService: ManageKelasRepository
    constructor() {
        this.manageKelasService = new ManageKelasRepository()
    }

    public async fetchAllKelas() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Kelas data..."))
        const kelas = await this.manageKelasService.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Kelas data."), kelas)
        return kelas
    }

    public async fetchKelasById(id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Fetching Kelas data with ID: ${id}`))
        const kelas_id = await this.manageKelasService.findUnique(id)
        if(!kelas_id) {
            console.log(chalk.redBright(`[Backend Service] Kelas data with ID: ${id} not found.`))
            throw new ErrorOutput(`Kelas data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Kelas data with ID: ${id}`), kelas_id)
        return kelas_id
    }
}