import { Router } from 'express'
import { admin_auth_login_controller, admin_auth_register_controller } from './admin.auth.controller'

const router = Router()

router.post('/register', admin_auth_register_controller)
router.post('/login', admin_auth_login_controller)

export default router