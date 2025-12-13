import { Router } from "express"
import { wali_kelas_edit_status_controller } from "./wali-kelas-edit-status.controller"
import { auth_token_middleware } from "../../../middleware/auth.middleware"

const router = Router()

router.put('/edit', auth_token_middleware, wali_kelas_edit_status_controller)

export default router