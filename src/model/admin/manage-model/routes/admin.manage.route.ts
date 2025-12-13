import { Router } from 'express'
import { auth_token_middleware } from '../../../../middleware/auth.middleware'
import { ManageWaliKelasController } from '../manage-wali-kelas/manage-wali-kelas.controller'
import { ManageGuruBKController } from '../manage-guru-bk/manage-guru-bk.controller'
import { ManageGuruController } from '../manage-guru/manage-guru.controller'
import { ManageKelasController } from '../manage-kelas/manage-kelas.controller'
import { ManageSiswaController } from '../manage-siswa/manage-siswa.controller'

const router = Router()
const waliKelasController = new ManageWaliKelasController()
const guruBkController = new ManageGuruBKController()
const guruController = new ManageGuruController()
const kelasController = new ManageKelasController()
const siswaController = new ManageSiswaController()

//wali-kelas
router.get('/wali-kelas', auth_token_middleware, waliKelasController.getAllWaliKelas)
router.get('/wali-kelas/:id', auth_token_middleware, waliKelasController.getWaliKelasById)

//guru-bk
router.get('/guru-bk', auth_token_middleware, guruBkController.getAllGuruBK)
router.get('/guru-bk/:id', auth_token_middleware, guruBkController.getGuruBKById)

//guru
router.get('/guru', auth_token_middleware, guruController.getAllGuru)
router.get('/guru/:id', auth_token_middleware, guruController.getGuruId)

//kelas
router.get('/kelas', auth_token_middleware, kelasController.getAllKelas)
router.get('/kelas/:id', auth_token_middleware, kelasController.getKelasById)

//siswa
router.get('/siswa', auth_token_middleware, siswaController.getAllSiswa)
router.get('/siswa/:id', auth_token_middleware, siswaController.getSiswaById)

export default router