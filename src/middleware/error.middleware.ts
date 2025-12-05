import type { Request, Response, NextFunction } from "express"
import ErrorOutput from "../utils/errorOutput"

export const error_middleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)

    let statusCode = 500
    let message = "Internal Server Error"

    if (error instanceof ErrorOutput) {
        statusCode = error.statusCode
        message = error.message
    }

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    })

    next(error)
}