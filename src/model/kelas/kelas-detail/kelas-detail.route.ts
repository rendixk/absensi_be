import { Router } from "express"
import { detail_kelas_controller } from "./kelas-detail.controller"
import { auth_token_middleware } from "../../../middleware/auth.middleware"

const router = Router()

router.get('/detail/:id', auth_token_middleware, detail_kelas_controller)

export default router