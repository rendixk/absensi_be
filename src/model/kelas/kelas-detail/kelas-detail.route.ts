import { Router } from "express"
import { detail_kelas_controller, presensi_controller } from "./kelas-detail.controller"
import { auth_token_middleware } from "../../../middleware/auth.middleware"

const router = Router()

router.get('/detail', auth_token_middleware, detail_kelas_controller)
router.get('/rekap', auth_token_middleware, presensi_controller)

export default router