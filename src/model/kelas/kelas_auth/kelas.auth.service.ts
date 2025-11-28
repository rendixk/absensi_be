import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { find_nama_kelas_repo, create_kelas_repo } from "../kelas.repo"
import { prisma } from "../../../config/prisma"
import type { create_kelas_interface } from "../interface/kelas_interface"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const kelas_auth_register_service = async (data: create_kelas_interface) => {
    const exist_kelas = await find_nama_kelas_repo(data.nama_kelas)
    if(exist_kelas) {
        console.log(chalk.redBright("Kelas with this name already exists."))
        throw new ErrorOutput("Kelas with this name already exists.", 409)
    }

    const result = await create_kelas_repo({
        nama_kelas: data.nama_kelas,
        password: await hash_password(data.password),
        wali_kelas_id: data.wali_kelas_id,
        guru_id: data.wali_kelas_id
    })

    const { password, ...kelas_without_pass } = result
    return {
        kelas: kelas_without_pass
    }
}

export const kelas_auth_login_service = async (nama_kelas: string, raw_password: string, current_guru_id: number) => {
    const kelas_account = await find_nama_kelas_repo(nama_kelas)
    if(!kelas_account) {
        console.log(chalk.redBright("Kelas not found with this name."))
        throw new ErrorOutput("Kelas not found with this name.", 404)
    }

    const match_password = await compare_password(raw_password, kelas_account.password)
    if(!match_password) {
        console.log(chalk.redBright("Incorrect password."))
        throw new ErrorOutput("Incorrect password.", 401)
    }

    await prisma.kelas.update({
        where: { id: kelas_account.id },
        data: {
            guru_id: current_guru_id
        }
    })

    const token = generate_token({ id: kelas_account.id, nama_kelas: kelas_account.nama_kelas })
    const { password, ...kelasWithoutPass } = kelas_account
    return {
        kelas: kelasWithoutPass,
        token: token
    }
}