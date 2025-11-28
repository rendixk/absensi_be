import { Router } from "express"
import { reset_db_controller } from "./reset_db.controller"

const router = Router()

router.delete('/', reset_db_controller)

export default router