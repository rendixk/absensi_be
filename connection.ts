import { prisma } from "./src/config/prisma"
import chalk from "chalk"

async function testConnection() {
    try {
        await prisma.$connect()
        console.log(chalk.green("✔ Database connected successfully"))
    }
    catch (error) {
        console.error(chalk.red("✘ Failed to connect to the database:"), error)
    }
    finally {
        await prisma.$disconnect()
    }
}

testConnection()