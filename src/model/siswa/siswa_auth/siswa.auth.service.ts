import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { find_siswa_username_repo, create_siswa_account_repo } from "./siswa.auth.repo"
import { find_nama_kelas_repo } from '../../kelas/kelas_auth/kelas.auth.repo'
import type { create_siswa_repo_input } from "../interface/siswa_interface"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const siswa_register_service = async (data: create_siswa_repo_input, nama_kelas: string) => {
    const exist_siswa = await find_siswa_username_repo(data.username)
    if(exist_siswa) {
        console.log(chalk.redBright("Siswa with this username already exist."))
        throw new ErrorOutput("Siswa with this username already exist.", 409)
    }

    const kelas = await find_nama_kelas_repo(nama_kelas)
    if(!kelas) {
        console.log(chalk.redBright(`Error: Class not found with name: ${nama_kelas}.`))
        throw new ErrorOutput("Nama kelas not found.", 404)
    }

    const register_result = await create_siswa_account_repo({
        username: data.username,
        nama_lengkap: data.nama_lengkap,
        nis: data.nis,
        kelas_id: kelas.id,
        password: await hash_password(data.password),
        nomor_wali: data.nomor_wali,
    })

    const { password, ...siswa_without_pass } = register_result
    return {
        kelas: siswa_without_pass
    }
}

export const siswa_login_service = async (username: string, raw_password: string) => {
    const siswa_account = await find_siswa_username_repo(username)
    if(!siswa_account) {
        console.log(chalk.redBright("Siswa not found with this username"))
        throw new ErrorOutput("Siswa not found with this username", 401)
    }

    const match_password = await compare_password(raw_password, siswa_account.password)
    if(!match_password) {
        console.log(chalk.redBright("Incorrect password."))
        throw new ErrorOutput("Incorrect password.", 401)
    }

    const token = generate_token(
        { 
            id: siswa_account.id, 
            username: siswa_account.username,
            kelas_id: siswa_account.kelas_id
        }
    )
    const { password, ...siswa_without_pass } = siswa_account
    return {
        siswa: siswa_without_pass,
        token: token
    }
}