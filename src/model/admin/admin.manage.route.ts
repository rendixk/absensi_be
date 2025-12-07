import { Router } from 'express'
import { 
    WaliKelasController,
    GuruBkController,
    GuruController,
    KelasController,
    SiswaController
} from './manage-model/manage-model.controller'
import { auth_token_middleware } from '../../middleware/auth.middleware'

const router = Router()
const waliKelasController = new WaliKelasController()
const guruBkController = new GuruBkController()
const guruController = new GuruController()
const kelasController = new KelasController()
const siswaController = new SiswaController()

//wali-kelas
router.get('/wali-kelas', auth_token_middleware, waliKelasController.getAllWaliKelas)
router.get('/wali-kelas/:id', auth_token_middleware, waliKelasController.getWaliKelasId)

//guru-bk
router.get('/guru-bk', auth_token_middleware, guruBkController.getAllGuruBk)
router.get('/guru-bk/:id', auth_token_middleware, guruBkController.getGuruBkId)

//guru
router.get('/guru', auth_token_middleware, guruController.getAllGuru)
router.get('/guru/:id', auth_token_middleware, guruController.getGuruId)

//kelas
router.get('/kelas', auth_token_middleware, kelasController.getAllKelas)
router.get('/kelas/:id', auth_token_middleware, kelasController.getKelasId)

//siswa
router.get('/siswa', auth_token_middleware, siswaController.getAllSiswa)
router.get('/siswa/:id', auth_token_middleware, siswaController.getSiswaId)

export default router