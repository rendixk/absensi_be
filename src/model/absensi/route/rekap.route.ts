import { Router } from "express"
import { auth_token_middleware } from "../../../middleware/auth.middleware"
import { edit_status_absensi_controller } from "../absensi-manage/edit-presensi-status.controller"
import { rekap_presensi_controller } from "../rekap-absensi/rekap.controller"

const router = Router()

router.put('/edit-absensi', auth_token_middleware, edit_status_absensi_controller)
router.get('/rekap-absensi/:kelas_id/:tanggal', auth_token_middleware, rekap_presensi_controller)

export default router