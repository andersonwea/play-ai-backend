import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes'
import cors from 'cors'
import { resolve } from 'path'

dotenv.config()

export const app = express()

app.use(
  cors({
    origin: '*',
  }),
)

app.use('/data', express.static(resolve(__dirname, 'data')))

app.use(express.json())

app.use(router)
