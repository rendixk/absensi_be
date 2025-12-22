import { ManageKelasRepository } from "./manage-kelas.repo"
import { ManageWaliKelasRepository } from "../manage-wali-kelas/manage-wali-kelas.repo"
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

    public async assignWaliKelasToKelas(kelas_id: number, wali_kelas_id: number) {
        const kelas = await this.manageKelasService.findUnique(kelas_id)
        if(!kelas) {
            console.log(chalk.redBright(`[Backend Service] Kelas data with ID: ${kelas_id} not found.`))
            throw new ErrorOutput(`Kelas data with ID: ${kelas_id} not found.`, 404)
        }

        const waliKelasRepo = new ManageWaliKelasRepository()
        const wali_kelas = await waliKelasRepo.findUnique(wali_kelas_id)

        if(!wali_kelas) {
            console.log(chalk.redBright(`[Backend Service] Wali Kelas data with ID: ${wali_kelas_id} not found.`))
            throw new ErrorOutput(`Wali Kelas data with ID: ${wali_kelas_id} not found.`, 404)
        }
        const existing_kelas_assignment = await this.manageKelasService.findKelasByWaliKelasId(wali_kelas_id)
    
        if (existing_kelas_assignment) {
        throw new ErrorOutput(`Wali Kelas ID ${wali_kelas_id} sudah menjabat di Kelas ${existing_kelas_assignment.nama_kelas}.`, 409)
        }

        const updated_kelas = await this.manageKelasService.findKelasByWaliKelasId(wali_kelas_id)
        
        console.log(chalk.greenBright(`[Backend Service] Assigned Wali Kelas ID ${wali_kelas_id} to Kelas ID ${kelas_id}`))
        return updated_kelas
    }
}