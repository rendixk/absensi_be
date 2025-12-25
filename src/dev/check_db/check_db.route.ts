import { Router } from "express"
// import { 
    // check_admin_model_controller,
    // check_guru_bk_model_controller,
    // check_guru_model_controller,
    // check_kelas_model_controller,
    // check_siswa_model_controller,
    // check_wali_kelas_model_controller
// } from "./check_db.controller"
import { CheckDBController } from "./check_db.controller"

const router = Router()
const checkDbController = new CheckDBController()

// router.get('/admin', check_admin_model_controller)
// router.get('/guru', check_guru_model_controller)
// router.get('/guru-bk', check_guru_bk_model_controller)
// router.get('/kelas', check_kelas_model_controller)
// router.get('/siswa', check_siswa_model_controller)
// router.get('/wali-kelas', check_wali_kelas_model_controller)

router.get("/wali-kelas", checkDbController.WaliKelas)
router.get("/guru", checkDbController.Guru)
router.get("/guru-bk", checkDbController.GuruBK)
router.get("/kelas", checkDbController.Kelas)
router.get("/siswa", checkDbController.Siswa)

export default router