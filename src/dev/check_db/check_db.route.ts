import { Router } from "express"
import { CheckDBController } from "./check_db.controller"

const router = Router()
const checkDbController = new CheckDBController()

router.get("/wali-kelas", checkDbController.WaliKelas)
router.get("/guru", checkDbController.Guru)
router.get("/guru-bk", checkDbController.GuruBK)
router.get("/kelas", checkDbController.Kelas)
router.get("/siswa", checkDbController.Siswa)

export default router