import { SiswaProfileRepo } from "./siswa-profile.repo"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export class SiswaProfileService {
    private siswa_profile: SiswaProfileRepo
    constructor() {
        this.siswa_profile = new SiswaProfileRepo()
    }

    public async findProfileSIswaId(siswa_id: number) {
        console.log(chalk.cyanBright(`[Backend Service] Fetching Siswa data by id...`))
        const data_siswa = await this.siswa_profile.findSiswaId(siswa_id)
        if(!data_siswa) {
            console.log(chalk.redBright(`[Backend Service] Siswa data with ID: ${siswa_id} not found.`))
            throw new ErrorOutput(`Siswa data with ID: ${siswa_id} not found.`, 404)
        }
        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Siswa data by id: ${siswa_id}`), data_siswa)
        return data_siswa
    }

    public async siswaProfileEdit(siswa_id: number, data: {
        username: string,
        nama_lengkap: string,
        nis: string,
        nomor_wali: string,
        avatar: string
    }) {
        console.log(chalk.greenBright("[Backend Service] Editing Siswa profile"))
        const siswa_profile = await this.siswa_profile.editSiswaProfile(siswa_id, data)

        if(!siswa_profile) {
            console.log(chalk.redBright(`[Backend Service] Siswa data with ID: ${siswa_id} not found.`))
            throw new ErrorOutput(`Siswa data with ID: ${siswa_id} not found.`, 404)
        }

        return siswa_profile
    }
}