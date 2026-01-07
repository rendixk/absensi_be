import multer from "multer"
import fs from "fs"
import ErrorOutput from "../utils/errorOutput"
import chalk from "chalk"
import path from "path"
import type { SiswaAuthRequest } from "../middleware/siswa-auth.middleware"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/image/siswa_pfp';
        
        // Check if directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            console.log(chalk.yellow(`[Multer Config] Creating directory: ${dir}`));
            fs.mkdirSync(dir, { recursive: true });
        }
        
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const user = (req as SiswaAuthRequest).user

        const ext = path.extname(file.originalname)
        const unique_suffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const file_name = `siswa-${user}-${unique_suffix}${ext}`
        cb(null, file_name)
    }
})

const file_filter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } 
    else {
        console.log(chalk.redBright(`[Multer Config] Rejected file type: ${file.mimetype}`))
        cb(new ErrorOutput("Unsupported file type. Only JPEG, JPG, and PNG are allowed", 400))
    }
}

export const upload_config = multer({
    storage: storage,
    fileFilter: file_filter,
    limits: {
        fieldSize: 5 * 1024 * 1024
    }
})