import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { find_admin_username_repo, create_admin_account_repo } from "./admin.auth.repo"
import type { create_admin_interface } from "../interface/admin_interface"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const admin_auth_register_service = async (data: create_admin_interface) => {
    const exist_admin = await find_admin_username_repo(data.username)
    if(exist_admin) {
        console.log(chalk.redBright("Admin with this username already exists."))
        throw new ErrorOutput("Admin with this username already exists.", 409)
    }

    const result = await create_admin_account_repo({
        username: data.username,
        password: await hash_password(data.password)
    })

    const { password, ...admin_without_pass } = result
    return {
        user: admin_without_pass
    }
}

export const admin_auth_login_service = async (username: string, raw_password: string) => {
    const admin_account = await find_admin_username_repo(username)
    if(!admin_account) {
        console.log(chalk.redBright("Admin not found with this username."))
        throw new ErrorOutput("Admin not found with this username.", 404)
    }

    const match_password = await compare_password(raw_password, admin_account.password)
    if(!match_password) {
        console.log(chalk.redBright("Incorrect password."))
        throw new ErrorOutput("Incorrect password.", 401)
    }

    const token = generate_token({ id: admin_account.id, username: admin_account.username, role: admin_account.role })
    const { password, ...adminWithoutPass } = admin_account
    return {
        admin: adminWithoutPass,
        token: token
    }
}