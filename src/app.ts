import express from 'express'
import cors from "cors"
import { notFoundMiddleware } from './middleware/notFound.middleware'
import { error_middleware } from './middleware/error.middleware'
import admin_route from './model/admin/admin_auth/admin.auth.route'
import guru_route from './model/guru/guru_auth/guru.auth.route'
import wali_kelas_route from "./model/wali_kelas/wali_kelas_auth/wali_kelas.auth.route"
import guru_bk_route from './model/guru_bk/guru_bk_auth/guru_bk.auth.route'
import kelas_route from './model/kelas/kelas_auth/kelas.auth.route'
import siswa_route from './model/siswa/siswa_auth/siswa.auth.route'
import check_db_route from './dev/check_db/check_db.route'
import reset_db_route from "./dev/reset_db/reset_db.route"

export const app = express()

const cors_option = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json())
app.use(cors(cors_option))

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

//routing path
//for admin
app.use('/admin/auth', admin_route)

//for guru
app.use('/guru/auth', guru_route)

//for guru bk
app.use('/guru-bk/auth', guru_bk_route)

//for wali kelas
app.use('/wali-kelas/auth', wali_kelas_route)

//for kelas
app.use('/kelas/auth', kelas_route)

//for siswa
app.use('/siswa/auth', siswa_route)

//for development
//check model
app.use('/check-db', check_db_route)
//reset db
app.use('/reset-db', reset_db_route)


app.use(notFoundMiddleware)
app.use(error_middleware)