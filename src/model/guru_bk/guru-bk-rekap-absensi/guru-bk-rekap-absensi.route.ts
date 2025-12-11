import { Router } from 'express'
import { trigger_monthly_rekap_controller, get_monthly_rekap_absensi_controller } from './guru-bk-rekap-absensi.controller'
import { auth_token_middleware, auth_guru_bk_middleware } from '../../../middleware/auth.middleware'

const router = Router()

router.post('/generate', auth_token_middleware, auth_guru_bk_middleware, trigger_monthly_rekap_controller)
router.get('/fetch', auth_token_middleware, auth_guru_bk_middleware, get_monthly_rekap_absensi_controller)

export default router