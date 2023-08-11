import express from 'express'
import { searchVideo } from './controllers/video'

export const router = express()

router.post('/api/search-video', searchVideo)
