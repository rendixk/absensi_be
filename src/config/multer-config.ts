import multer from "multer"
import fs from "fs"
import ErrorOutput from "../utils/errorOutput"
import chalk from "chalk"
import path from "path"
import type { SiswaAuthRequest } from "../middleware/siswa-auth.middleware"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/upload/siswa_pfp';
        
        // Check if directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            console.log(chalk.yellow(`[Multer Config] Creating directory: ${dir}`));
            fs.mkdirSync(dir, { recursive: true });
        }
        
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const auth_req = req as SiswaAuthRequest
        const user_id = auth_req.user?.id

        if(!user_id) {
            console.log(chalk.redBright("[Multer Config: Siswa PFP] Authentication failed: user id is missing"))
            return cb(new ErrorOutput("Authentication required: User ID missing.", 401), '')
        }

        const ext = path.extname(file.originalname)
        const unique_suffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const file_name = `siswa-${user_id}-${unique_suffix}${ext}`
        cb(null, file_name)
    }
})

const file_filter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    } 
    else {
        console.log(chalk.redBright("[Multer Config: Siswa PFP] Unsupported file type. Only JPEG, JPG, and PNG are allowed"))
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