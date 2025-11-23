import * as bcrypt from "bcrypt"
import chalk from "chalk"

const salt = 10

export const hash_password = (password: string) => {
    console.log(chalk.blueBright("Hashing password..."))
    return bcrypt.hash(password, salt)
}

export const compare_password = async (password: string, hash: string) => {
    console.log(chalk.blueBright("Comparing password..."))
    return bcrypt.compare(password, hash)
}