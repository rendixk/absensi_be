import { ManageGuruRepository } from "./manage-guru.repo"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageGuruService {
    private manageGuru: ManageGuruRepository
    constructor() {
        this.manageGuru = new ManageGuruRepository()
    }

    public async fetchAllGuru() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Guru data..."))
        const guru = await this.manageGuru.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Guru data."), guru)
        return guru
    }

    public async fetchGuruById(id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Fetching Guru data with ID: ${id}`))
        const guru_id = await this.manageGuru.findUnique(id)
        if(!guru_id) {
            console.log(chalk.redBright(`[Backend Service] Guru data with ID: ${id} not found.`))
            throw new ErrorOutput(`Guru data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Guru data with ID: ${id}`), guru_id)
        return guru_id
    }

    public async deleteGuru(id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Deleting Guru with ID:`), id)
        const guru_id = await this.manageGuru.findUnique(id)
        if(!guru_id) {
            console.log(chalk.redBright(`[Backend Service] Guru data with ID: ${id} not found.`))
            throw new ErrorOutput(`Guru data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully deleted Guru with ID: ${id}`), guru_id)
        return guru_id
    }
}