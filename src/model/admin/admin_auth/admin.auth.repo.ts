import { prisma } from "../../../config/prisma"
import type { create_admin_interface } from "./interface/admin_interface"

//for login
export const find_admin_username_repo = (username: string) => {
    const strict_name = username.trim().toLowerCase()

    return prisma.admin.findUnique({
        where: { 
            username: strict_name
         }
    })
}

// for register
export const create_admin_account_repo = (data: create_admin_interface) => {
    return prisma.admin.create({
        data: data
    })
}