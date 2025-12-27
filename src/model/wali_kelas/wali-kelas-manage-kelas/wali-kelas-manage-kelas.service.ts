import { WKManageKelasRepo } from "./wali-kelas-manage-kelas.repo"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export class WKManageKelasService {
    private wkkelas: WKManageKelasRepo
    constructor() {
        this.wkkelas = new WKManageKelasRepo()
    }

    public async findKelasWK(wali_kelas_id: number) {
        console.log(chalk.blueBright("[Backend Service] Fetch kelas that belongs to wali kelas..."))
        const kelas_wk = await this.wkkelas.findKelasWK(wali_kelas_id)
        if(!kelas_wk) {
            console.error(chalk.redBright("[Backend Service] Kelas that you searching for is not found"))
            throw new ErrorOutput("kelas not found", 404)
        }
        console.log(chalk.greenBright("[Backend Service] Successfully fetched kelas by wali kelas id"), kelas_wk)
        return kelas_wk
    }
}