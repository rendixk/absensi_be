import { Router } from "express"
import { auth_token_middleware } from "../../../middleware/auth.middleware"
import { WKManageKelasController } from "./wali-kelas-manage-kelas.controller"

const router = Router()
const my_class = new WKManageKelasController()

router.get("/kelas-ku", auth_token_middleware, my_class.getKelasByWKId)
export default router