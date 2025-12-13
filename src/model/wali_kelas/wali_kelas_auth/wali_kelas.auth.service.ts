import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { find_wali_kelas_username_repo, create_wali_kelas_account } from "./wali_kelas.auth.repo"
import type { create_wali_kelas_interface } from "./interface/wali_kelas.interface"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const wali_kelas_register_service = async (data: create_wali_kelas_interface) => {
    const exist_wali_kelas = await find_wali_kelas_username_repo(data.username)
    if(exist_wali_kelas) {
        console.log(chalk.redBright("Wali Kelas with this username already exist."))
        throw new ErrorOutput("Wali Kelas with this username already exist.", 409)
    }

    const hashed_password = await hash_password(data.password)

    const result = await create_wali_kelas_account({
        username: data.username,
        nip: data.nip,
        mapel: data.mapel,
        password: hashed_password,
    })

    const { password, ...wali_kelas_without_pass } = result
    return {
        user: wali_kelas_without_pass
    }
}

export const wali_kelas_login_service = async (username: string, raw_password: string) => {
    const wali_kelas_account = await find_wali_kelas_username_repo(username)
    if(!wali_kelas_account) {
        console.log(chalk.redBright("Wali kelas not found with this username"))
        throw new ErrorOutput("Wali kelas with not found with this username", 404)
    }

    const match_password = await compare_password(raw_password, wali_kelas_account.password)
    if(!match_password) {
        console.log(chalk.redBright("Incorrect password."))
        throw new ErrorOutput("Incorrect password.", 401)
    }

    const token = generate_token({ id: wali_kelas_account.id, username: wali_kelas_account.username, role: wali_kelas_account.role })
    const { password, ...wali_kelas_without_pass } = wali_kelas_account
    return {
        wali_kelas: wali_kelas_without_pass,
        token: token
    }
}