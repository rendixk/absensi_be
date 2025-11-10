import chalk from "chalk"
import { app } from "../app"

export function bootstrap() {
    const PORT = 3000

    console.log(chalk.cyan(`[App] ${process.pid} - ${new Date().toLocaleString()}`))
    console.log(chalk.yellowBright("[App] Starting Express server..."))

    const server = app.listen(PORT, () => {
        console.log(chalk.greenBright(`[App] Server is running on http://localhost:${PORT}`))
    })

    process.on("SIGINT", async () => {
        console.log(chalk.yellowBright("\nShutting down..."))
        server.close(() => {
            console.log(chalk.greenBright("Server closed."))
            process.exit(0)
        })
    })
}