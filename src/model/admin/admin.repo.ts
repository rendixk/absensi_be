import { prisma } from "../../config/prisma"
import type { create_admin_interface } from "./types/admin_interface"

//for login
export const find_admin_email_repo = (email: string) => {
    return prisma.admin.findUnique({
        where: { email }
    })
}

// for register
export const create_admin_account_repo = (data: create_admin_interface) => {
    return prisma.admin.create({
        data: data
    })
}