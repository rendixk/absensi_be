import express from 'express'
import cors from "cors"
import { notFoundMiddleware } from './middleware/notFound.middleware'
import { error_middleware } from './middleware/error.middleware'
import admin_route from './model/admin/admin_auth/admin.auth.route'

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



app.use(notFoundMiddleware)
app.use(error_middleware)