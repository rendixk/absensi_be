import { 
    GuruRepository, 
    GuruBKRepository, 
    KelasRepostitory, 
    SiswaRepository, 
    WaliKelasRepository 
} from './manage-model.repo'
import ErrorOutput from '../../../utils/errorOutput'
import chalk from 'chalk'

export class WaliKelasService {
    private waliKelasService: WaliKelasRepository
    constructor() {
        this.waliKelasService = new WaliKelasRepository()
    }

    async fetchAllWaliKelas() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Wali Kelas data..."))
        const wali_kelas = await this.waliKelasService.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Wali Kelas data."), wali_kelas)
        return wali_kelas
    }

    async fetchWaliKelasId(id: number) {
        console.log(chalk.cyanBright("[Backend Service] Fetching Wali Kelas data with ID:"), id)
        const wali_kelas_id = this.waliKelasService.findUnique(id)
        if(!wali_kelas_id) {
            console.log(chalk.redBright(`[Backend Service] Wali Kelas data with ID: ${id} not found.`))
            throw new ErrorOutput(`Wali Kelas data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright(`[Backend Service] Successfully fetched Wali Kelas data with ID: ${id}.`))
        return wali_kelas_id
    }
}

export class GuruService {
    private guruService: GuruRepository
    constructor() {
        this.guruService = new GuruRepository()
    }

    async allGuru() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Guru data..."))
        const guru = await this.guruService.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Guru data."), guru)
        return guru
    }

    async guruId(id: number) {
        console.log(chalk.cyanBright("[Backend Service] Fetching Guru data with ID:"), id)
        const guru_id = await this.guruService.findUnique(id)
        if(!guru_id) {
            console.log(chalk.redBright("[Backend Service] Guru data with ID not found:"), id)
            throw new ErrorOutput(`Guru data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright("[Backend Service] Successfully fetched Guru data with ID:"), guru_id)
        return guru_id
    }
}

export class GuruBkService {
    private guruBkService: GuruBKRepository
    constructor() {
        this.guruBkService = new GuruBKRepository()
    }

    async allGuruBk() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Guru BK data..."))
        const guru_bk = await this.guruBkService.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Guru BK data."), guru_bk)
        return guru_bk
    }

    async guruBkId(id: number) {
        console.log(chalk.cyanBright("[Backend Service] Fetching Guru BK data with ID:"), id)
        const guru_bk_id = await this.guruBkService.findUnique(id)
        if(!guru_bk_id) {
            console.log(chalk.redBright("[Backend Service] Guru BK data with ID not found:"), id)
            throw new ErrorOutput(`Guru BK data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright("[Backend Service] Successfully fetched Guru BK data with ID:"), guru_bk_id)
        return guru_bk_id
    }
}

export class KelasService {
    private kelasService: KelasRepostitory
    constructor() {
        this.kelasService = new KelasRepostitory()
    }

    async fetchAllKelas() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Kelas data..."))
        const kelas = await this.kelasService.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Kelas data."), kelas)
        return kelas
    }

    async fetchKelasId(id: number) {
        console.log(chalk.cyanBright("[Backend Service] Fetching Kelas data with ID:"), id)
        const kelas_id = await this.kelasService.findUnique(id)
        if(!kelas_id) {
            console.log(chalk.redBright("[Backend Service] Kelas data with ID not found:"), id)
            throw new ErrorOutput(`Kelas data with ID: ${id} not found.`, 404)
        }

        console.log(chalk.greenBright("[Backend Service] Successfully fetched Kelas data with ID:"), kelas_id)
        return kelas_id
    }
}

export class SiswaService {
    private siswaService: SiswaRepository
    constructor() {
        this.siswaService = new SiswaRepository()
    }

    async fetchAllSiswa() {
        console.log(chalk.cyanBright("[Backend Service] Fetching all Siswa data..."))
        const siswa = await this.siswaService.findMany()
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Siswa data."), siswa)
        return siswa
    }

    async fetchSiswaId(id: number) {
        console.log(chalk.cyanBright("[Backend Service] Fetching Siswa data with ID:"), id)
        const siswa_id = await this.siswaService.findUnique(id)
        if(!siswa_id) {
            console.log(chalk.redBright("[Backend Service] Siswa data with ID not found:"), id)
            throw new ErrorOutput(`Siswa data with ID: ${id} not found.`, 404)
        }
        
        console.log(chalk.greenBright("[Backend Service] Successfully fetched Siswa data with ID:"), siswa_id)
        return siswa_id
    }
}