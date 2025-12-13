import { prisma } from "../../../config/prisma"
import type { create_admin_interface } from "./interface/admin_interface"

//for login
export const find_admin_username_repo = (username: string) => {
    return prisma.admin.findUnique({
        where: { username }
    })
}

// for register
export const create_admin_account_repo = (data: create_admin_interface) => {
    return prisma.admin.create({
        data: data
    })
}