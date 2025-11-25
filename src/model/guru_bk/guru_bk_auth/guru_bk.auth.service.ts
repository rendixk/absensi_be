import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { find_guru_bk_username_repo, create_guru_bk_account_repo } from "../guru_bk.repo"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const guru_bk_auth_register_service = async (data: { username: string, password: string, nip: number }) => {
    const exist_guru_bk = await find_guru_bk_username_repo(data.username)
    if(exist_guru_bk) {
        console.log("Guru BK with this username already exists.")
        throw new ErrorOutput("Guru BK with this username already exists.", 409)
    }
    const result = await create_guru_bk_account_repo({
        username: data.username,
        password: await hash_password(data.password),
        nip: data.nip
    })

    const { password, ...guru_bk_without_pass } = result
    return {
        user: guru_bk_without_pass
    }
}

export const guru_bk_auth_login_service = async (username: string, raw_password: string) => {
    const guru_bk_account = await find_guru_bk_username_repo(username)
    if(!guru_bk_account) {
        console.log(chalk.redBright("Guru BK not found with this username."))
        throw new ErrorOutput("Guru BK not found with this username.", 404)
    }
    const match_password = await compare_password(raw_password, guru_bk_account.password)
    if(!match_password) {
        console.log(chalk.redBright("Incorrect password."))
        throw new ErrorOutput("Incorrect password.", 401)
    }

    const token = generate_token({ id: guru_bk_account.id, username: guru_bk_account.username })
    const { password, ...guru_bkWithoutPass } = guru_bk_account
    return {
        guru_bk: guru_bkWithoutPass,
        token: token
    }
}