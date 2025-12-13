export interface QR_Token_Payload {
    kelas_id: number
    qrtype: "clock_in" | "clock_out"
}

export interface create_QR_Token_Input {
    token: string
    kelas_id: number
    expired_at: Date
    qrtype: "clock_in" | "clock_out"
}