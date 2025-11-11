import type { Request, Response, NextFunction } from "express"
import ErrorOutput from "../utils/errorOutput"

export const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorOutput("Not Found", 404)

    next(error)
}