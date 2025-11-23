import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv"
import ErrorOutput from '../../utils/errorOutput';

dotenv.config()

const JWT_SECRET_KEY = process.env.JWT_SECRET
if(!JWT_SECRET_KEY){
    console.log("jwt token is not defined in environment variables")
    throw new ErrorOutput("jwt token is not defined in environment variables", 401)
}

const JWT_EXPIRES_IN = "1d"

export const generate_token = (payload: object) => {
    if(!JWT_SECRET_KEY){
        console.log("jwt token is not defined in environment variables")
        throw new ErrorOutput("jwt token is not defined in environment variables", 401)
    }
    console.log("Generating JWT token...")
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
}

export const verify_token = (token: string) => {
    if (!JWT_SECRET_KEY) {
        throw new ErrorOutput("Cannot verify token: token is undefined.", 401);
    }
    console.log("Verifying token...")
    return jwt.verify(token, JWT_SECRET_KEY)
}