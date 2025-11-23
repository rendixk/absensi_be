import { Router } from 'express'
import { auth_login_controller, auth_register_controller } from './admin.auth.controller'

const router = Router()

router.post('/register', auth_register_controller)
router.post('/login', auth_login_controller)

export default router