import { prisma } from "../../../config/prisma"
import type { create_guru_bk_interface } from "./interface/guru_bk.interface"

// for login
export const find_guru_bk_username_repo = (username: string) => {
    return prisma.guru_bk.findUnique({
        where: { username }
    })
}

//for register
export const create_guru_bk_account_repo = (data: create_guru_bk_interface) => {
    return prisma.guru_bk.create({
        data: data
    })
}