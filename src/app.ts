import express from 'express'
import cors from "cors"
import path from 'path'
import { notFoundMiddleware } from './middleware/notFound.middleware'
import { error_middleware } from './middleware/error.middleware'
import { start_rekap_absensi_scheduler } from './config/cron/cron-rekap-scheduler'
import { start_trace_forgotten_clock_out_scheduler } from './config/cron/cron-scheduler-clock-out'
import { fileURLToPath } from 'url'
import absensi_route from './model/absensi/route/rekap.route'
// import rekap_absensi_route from './model/absensi/rekap-absensi/rekap.route'
import admin_route from './model/admin/admin_auth/admin.auth.route'
import admin_manage_model_route from './model/admin/manage-model/routes/admin.manage.route'
import guru_route from './model/guru/guru_auth/guru.auth.route'
import wali_kelas_route from "./model/wali_kelas/wali_kelas_auth/wali_kelas.auth.route"
import wali_kelas_manage_kelas from "./model/wali_kelas/wali-kelas-manage-kelas/wali-kelas-manage-kelas.route"
// import edit_absensi_status from "./model/absensi/absensi-manage/edit-presensi-status.route"
import guru_bk_route from './model/guru_bk/guru_bk_auth/guru_bk.auth.route'
import kelas_route from './model/kelas/kelas_auth/kelas.auth.route'
import kelas_detail_route from "./model/kelas/kelas-detail/kelas-detail.route"
import siswa_route from './model/siswa/siswa_auth/siswa.auth.route'
import siswa_absensi_route from './model/siswa/siswa-absensi/siswa-absensi.route' // for siswa scan QR code
import siswa_profile_route from './model/siswa/siswa-profile/siswa-profile.route'
import qr_generate_token_route from './model/qr-token/qr-token.route'
// import rekap_absensi_route from './model/rekap-absensi/rekap-absensi.route'
import check_db_route from './dev/check_db/check_db.route'
import reset_db_route from "./dev/reset_db/reset_db.route"
import chalk from 'chalk'

export const app = express()

const cors_option = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const project_root = path.resolve(__dirname, "..")

app.use(express.json())
app.use(cors(cors_option))

start_rekap_absensi_scheduler()
start_trace_forgotten_clock_out_scheduler()
console.log(chalk.blueBright("[System] Attendance Schedulers are now active."))

app.get('/', (req, res) => {
  res.send('Hello absensi project mobile based!')
})

//edit siswa profile
app.use('/uploads', express.static(path.join(project_root, "public")))

//routing path
//for absensi
app.use('/absensi', absensi_route)

//for admin
app.use('/admin/auth', admin_route)
app.use('/admin/manage', admin_manage_model_route)

//for guru
app.use('/guru/auth', guru_route)

//for guru bk
app.use('/guru-bk/auth', guru_bk_route)

//for wali kelas
app.use('/wali-kelas/auth', wali_kelas_route)
app.use("/wali-kelas", wali_kelas_manage_kelas)

//for kelas
app.use('/kelas/auth', kelas_route) // the /kelas/auth/login made for guru
app.use('/kelas', kelas_detail_route)
app.use('/kelas/absensi', qr_generate_token_route) // for generate QR token

//for siswa
app.use('/siswa/auth', siswa_route)
app.use('/siswa/absensi', siswa_absensi_route) // siswa scan QR code here
app.use('/siswa', siswa_profile_route)

//for rekap-absnesi
// app.use('/rekap-absensi', rekap_absensi_route)

//for development
//check model
app.use('/check-db', check_db_route)
//reset db
app.use('/reset-db', reset_db_route)

app.use(notFoundMiddleware)
app.use(error_middleware)