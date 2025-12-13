// import type { Request, Response, NextFunction } from "express"
// import { QR_Code_Type } from "../generated"
// import jwt from "jsonwebtoken"
// import { prisma } from "../config/prisma"
// import ErrorOutput from "../utils/errorOutput"
// import chalk from "chalk"

// const JWT_TOKEN = process.env.JWT_SECRET as string

// interface QRTokenPayload {
//     kelas_id: number
//     // qr_type: 'clock_in' | 'clock_out'
//     qr_type: QR_Code_Type
// }

// interface QRAuthRequest extends Request {
//     qr_data?: QRTokenPayload
// }

// export const qr_token_middleware = async (req: QRAuthRequest, res: Response, next: NextFunction) => {
//     // write the qr-code to body
//     const qr_token_string = req.body.qr_token as string
//     if(!qr_token_string) {
//         return next(new ErrorOutput("QR Code is required", 404))
//     }

//     // let payload: QRTokenPayload | null = null
//     let payload: QRTokenPayload

//     // Step Uno: JWT Verification
//     try {
//         payload = jwt.verify(qr_token_string, JWT_TOKEN) as QRTokenPayload

//         if(!payload.kelas_id || !payload.qr_type) {
//             console.log(chalk.redBright("QR Token payload incomplete"))
//             return next(new ErrorOutput("Invalid QR Code payload", 401))
//         }
//     } 
//     catch (error: any) {
//         if(error instanceof jwt.TokenExpiredError) {
//             console.log(chalk.yellowBright("QR Code expired"))
//             return next(new ErrorOutput("QR Code has expired", 401))
//         }
//         console.log(chalk.redBright(`JWT Verification failed: ${error.message}`))
//         return next(new ErrorOutput("Invalid QR Code signature or format.", 401))
//     }

//     //Step Dos: Database Verification
//     try {
//         const token_record = await prisma.qr_token.findUnique({
//             where: { token: qr_token_string }
//         })

//         if(!token_record) {
//             console.log(chalk.redBright("QR Token not found in DB:"), token_record)
//             return next(new ErrorOutput("QR Code is not registered", 404))
//         }

//         if(token_record.used === true) {
//             console.log(chalk.redBright("QR token has already used, id"), token_record.id)
//             return next(new ErrorOutput("This QR code has been used", 403))
//         }

//         //Step Tres : Pass verified Data to controller
//         // Pass the verified data from the JWT payload to the next handler
//         req.qr_data = payload

//         console.log(`[Backend Debug] QR Token Valid: Class ${payload.kelas_id}, Type ${payload.qr_type}`)

//         next()
//     } 
//     catch (error: any) {
//         console.error(chalk.redBright(`Database/Middleware Error: ${error.message}`))
//         return next(new ErrorOutput("An error occurred while processing the QR Code.", 500))
//     }
// }