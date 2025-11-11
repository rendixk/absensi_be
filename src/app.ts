import express from 'express'
import { notFoundMiddleware } from './middleware/notFound.middleware'
import { error_middleware } from './middleware/error.middleware'

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(notFoundMiddleware)
app.use(error_middleware)