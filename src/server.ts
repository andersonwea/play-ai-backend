import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes'
import cors from 'cors'
import { resolve } from 'path'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
  }),
)

app.use('/data', express.static(resolve(__dirname, 'data')))

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port http://localhost:${PORT}`)
})
