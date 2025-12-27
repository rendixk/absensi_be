import { generate_token } from "../../../config/auth_policy/jwt"
import { hash_password, compare_password } from "../../../config/auth_policy/bcrypt"
import { 
    find_nama_kelas_repo, 
    create_kelas_repo,
    find_kelas_id,
    guru_logout_repo,
    edit_nama_kelas_repo,
} from "./kelas.auth.repo"
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
        guru_id: null
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

    const guruExists = await prisma.guru.findUnique({ where: { id: current_guru_id } });
    if (!guruExists) {
        console.log(chalk.redBright("[Backend Service] Invalid Guru ID. You must be a registered Guru to login to a class."))
        throw new ErrorOutput("Invalid Guru ID. You must be a registered Guru to login to a class.", 403);
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

export const guru_logout_kelas_service = async (kelas_id: number, guru_id: number) => {
    const data_kelas = await find_kelas_id(kelas_id)
    if(!data_kelas) {
        console.log(chalk.redBright("Kelas not found."))
        throw new ErrorOutput("Kelas not found.", 404)
    }

    if (!data_kelas.guru_id) {
        console.log(chalk.redBright("This class currently has no active Guru."))
        throw new ErrorOutput("This class currently has no active Guru.", 400)
    }

    if(!data_kelas.wali_kelas_id)

    if(data_kelas.guru_id !== guru_id) {
        console.log(chalk.redBright(`Access Denied: Guru ID ${guru_id} is not the active Guru in kelas ${kelas_id}`))
        throw new ErrorOutput("Access Denied. You are not the active Guru for this class.", 403)
    }

    await guru_logout_repo(kelas_id)

    console.log(chalk.redBright(`Guru with ID ${guru_id} successfuly loggoet out from kelas id: ${kelas_id}`))

    return { 
        message: `Successfully logged out from Kelas ${data_kelas.nama_kelas}. The class is now without an active Guru.` 
    }
}

export const edit_kelas_nama_service = async (nama_kelas: string) => {
    const kelas_exist = await find_nama_kelas_repo(nama_kelas)
    if(kelas_exist) {
        console.log(chalk.redBright("Kelas with this name already exists."))
        throw new ErrorOutput("Kelas with this name already exists.", 409)
    }

    const updated_kelas = await edit_nama_kelas_repo(nama_kelas)
    return updated_kelas
}