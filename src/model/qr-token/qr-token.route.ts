import { Router } from "express"
import { 
    generate_clock_in_token_controller, 
    generate_clock_out_token_controller 
} from "./qr-token.controller"
import { auth_token_middleware } from '../../middleware/auth.middleware';

const router = Router()

router.post("/generate/clock-in", auth_token_middleware, generate_clock_in_token_controller)
router.post("/generate/clock-out", auth_token_middleware, generate_clock_out_token_controller)

export default router