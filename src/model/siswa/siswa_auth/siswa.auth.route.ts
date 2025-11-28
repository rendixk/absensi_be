import { Router } from "express"
import { siswa_register_controller, siswa_login_controller } from "./siswa.auth.controller"

const router = Router()

router.post('/register', siswa_register_controller)
router.post('/login', siswa_login_controller)

export default router