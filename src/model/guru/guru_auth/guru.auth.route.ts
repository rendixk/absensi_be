import { Router } from "express"
import { guru_auth_login_controller, guru_auth_register_controller } from "./guru.auth.controller"

const router = Router()

router.post('/register', guru_auth_register_controller)
router.post('/login', guru_auth_login_controller)

export default router