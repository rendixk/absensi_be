import { Router } from "express"
import { siswa_auth_middleware } from '../../../middleware/siswa-auth.middleware';
import { SiswaProfileController } from "./siswa-profile.controller"
import { upload_siswa_profile } from '../../../middleware/siswa-pfp-upload.middleware';

const router = Router()
const siswaProfileController = new SiswaProfileController()

router.get('/profile-ku', siswa_auth_middleware, siswaProfileController.SiswaProfile)
router.patch('/profile-ku/edit', siswa_auth_middleware, upload_siswa_profile, siswaProfileController.editSiswaProfileController)

export default router