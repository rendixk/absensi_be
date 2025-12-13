import { ManageGuruBKRepository } from "./manage-guru-bk.repo"
import ErrorOutput from "../../../../utils/errorOutput"
import chalk from "chalk"

export class ManageGuruBKService {
    private manageGuruBK: ManageGuruBKRepository
    constructor() {
        this.manageGuruBK = new ManageGuruBKRepository()
    }

    public async fetchAllGuruBK() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Guru BK data..."))
        const guru_bk = await this.manageGuruBK.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Guru BK data."), guru_bk)
        return guru_bk
    }

    public async fetchGuruBKById(id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Fetching Guru BK data with ID: ${id}`))
        const guru_bk_id = await this.manageGuruBK.findUnique(id)
        if(!guru_bk_id) {
            console.log(chalk.redBright(`[Backend Service] Guru BK data with ID: ${id} not found.`))
            throw new ErrorOutput(`Guru BK data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Guru BK data with ID: ${id}`), guru_bk_id)
        return guru_bk_id
    }
}