import { Router } from "express"
import { wali_kelas_register_controller, wali_kelas_login_controller } from "./wali_kelas.auth.controller"

const router = Router()

router.post('/register', wali_kelas_register_controller)
router.post('/login', wali_kelas_login_controller)

export default router