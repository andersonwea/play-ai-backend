import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port http://localhost:${PORT}`)
})