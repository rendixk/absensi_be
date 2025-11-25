import { Router } from "express"
import { guru_bk_auth_register_controller, guru_bk_auth_login_controller } from "./guru_bk.auth.controller"

const router = Router()

router.post('/register', guru_bk_auth_register_controller)
router.post('/login', guru_bk_auth_login_controller)

export default router