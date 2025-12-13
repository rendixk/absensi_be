import { prisma } from "../../config/prisma"
import type { create_QR_Token_Input } from "./interface/qr-token_interface"

export const create_qr_token_repo = (data: create_QR_Token_Input) => {
    return prisma.qr_token.create({
        data: data
    })
}