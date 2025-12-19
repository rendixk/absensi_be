import { Router } from "express"
import { 
    kelas_auth_login_controller, 
    kelas_auth_register_controller,
    guru_logout_kelas_controller,
    edit_kelas_nama_controller,
} from "./kelas.auth.controller"
import { auth_token_middleware } from "../../../middleware/auth.middleware"

const router = Router()

router.post("/register", auth_token_middleware, kelas_auth_register_controller)
router.post("/login", auth_token_middleware, kelas_auth_login_controller)
router.post("/logout", auth_token_middleware, guru_logout_kelas_controller)
router.patch("/edit", auth_token_middleware, edit_kelas_nama_controller)
router.get("/edit", auth_token_middleware, edit_kelas_nama_controller)

export default router