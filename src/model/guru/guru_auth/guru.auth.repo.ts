import { prisma } from "../../../config/prisma"
import type { create_guru_interface } from "../interface/guru_interface"

export const find_guru_username_repo = (username: string) => {
    return prisma.guru.findUnique({
        where: { username }
    })
}

export const create_guru_account_repo = (data: create_guru_interface) => {
    return prisma.guru.create({
        data: data
    })
}