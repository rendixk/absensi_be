import { ManageWaliKelasRepository } from "./manage-wali-kelas.repo"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageWaliKelasService {
    private manageWaliKelas: ManageWaliKelasRepository
    constructor() {
        this.manageWaliKelas = new ManageWaliKelasRepository()
    }

    public async fetchAllWaliKelas() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Wali Kelas data..."))
        const wali_kelas = await this.manageWaliKelas.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Wali Kelas data."), wali_kelas)
        return wali_kelas
    }

    public async fetchWaliKelasById(id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Fetching Wali Kelas data with ID: ${id}`))
        const wali_kelas_id = await this.manageWaliKelas.findUnique(id)
        if(!wali_kelas_id) {
            console.log(chalk.redBright(`[Backend Service] Wali Kelas data with ID: ${id} not found.`))
            throw new ErrorOutput(`Wali Kelas data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Wali Kelas data with ID: ${id}`), wali_kelas_id)
        return wali_kelas_id
    }
}