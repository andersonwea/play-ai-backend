import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port http://localhost:${PORT}`)
})
