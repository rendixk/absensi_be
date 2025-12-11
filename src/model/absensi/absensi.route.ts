import { Router } from 'express'
import { get_daily_absensi_summary_controller } from './absensi.controller'
import { auth_token_middleware } from '../../middleware/auth.middleware'

const router = Router()

router.get('/daily-summary', auth_token_middleware, get_daily_absensi_summary_controller)

export default router