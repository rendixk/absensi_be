import { Router } from "express"
import { check_in_siswa_controller } from "./siswa-absensi.controller"
import { siswa_auth_middleware } from "../../../middleware/siswa-auth.middleware"

const router = Router()

router.post('/', siswa_auth_middleware, check_in_siswa_controller)

export default router