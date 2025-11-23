// import { prisma } from "../../../config/prisma"
import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { find_admin_email_repo, create_admin_account_repo } from "../admin.repo"
import type { create_admin_interface } from "../types/admin_interface"
import ErrorOutput from "../../../utils/errorOutput"

export const auth_register_service = async (email: string, data: create_admin_interface) => {
    const exist_user = await find_admin_email_repo(email)
    if(exist_user) {
        console.log("Admin with this email already exists.")
    }

    const result = await create_admin_account_repo({
        username: data.username,
        email: data.email,
        password: await hash_password(data.password)
    })

    const { password, ...userWithoutPass } = result
    return {
        user: userWithoutPass
    }
}

export const auth_login_service = async (email: string, raw_password: string) => {
    const admin = await find_admin_email_repo(email)
    if(!admin) {
        console.log("Admin not found with this email.")
        throw new ErrorOutput("Admin not found with this email.", 404)
    }

    const match_password = await compare_password(raw_password, admin.password)
    if(!match_password) {
        console.log("Incorrect password.")
        throw new ErrorOutput("Incorrect password.", 401)
    }

    const token = generate_token({ id: admin.id, email: admin.email, username: admin.username })
    const { password, ...adminWithoutPass } = admin
    return {
        admin: adminWithoutPass,
        token: token
    }
}