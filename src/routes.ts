import express from 'express'
import { searchVideo } from './controllers/video'
import { getAudioFromVideo } from './controllers/audio'

export const router = express()

router.post('/api/search-video', searchVideo)

router.post('/api/get-audio-from-video', getAudioFromVideo)
