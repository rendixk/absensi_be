import { generate_token } from '../../../config/auth_policy/jwt'
import { hash_password, compare_password } from '../../../config/auth_policy/bcrypt'
import { find_guru_username_repo, create_guru_account_repo } from './guru.auth.repo'
import type { create_guru_interface } from '../interface/guru_interface'
import ErrorOutput from '../../../utils/errorOutput'
import chalk from 'chalk'

export const guru_auth_register_service = async (data: create_guru_interface) => {
    const exist_guru = await find_guru_username_repo(data.username)
    if(exist_guru) {
        console.log("Guru with this username already exists.")
    }

    const result = await create_guru_account_repo({
        username: data.username,
        nip: data.nip,
        mapel: data.mapel,
        password: await hash_password(data.password),
    })

    const { password, ...guru_without_pass } = result
    return {
        user: guru_without_pass
    }
}

export const guru_auth_login_service = async (username: string, raw_password: string) => {
    const guru_account = await find_guru_username_repo(username)
    if(!guru_account) {
        console.log(chalk.redBright("Guru not found with this username."))
        throw new ErrorOutput("Guru not found with this username.", 404)
    }

    const match_password = await compare_password(raw_password, guru_account.password)
    if(!match_password) {
        console.log(chalk.redBright("Incorrect password."))
        throw new ErrorOutput("Incorrect password.", 401)
    }

    const token = generate_token({ id: guru_account.id, username: guru_account.username, role: guru_account.role })
    const { password, ...guruWithoutPass } = guru_account
    return {
        guru: guruWithoutPass,
        token: token
    }
}