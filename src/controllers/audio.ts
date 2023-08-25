import { Request, Response } from 'express'
import { resolve } from 'path'
import youtubedl from 'youtube-dl-exec'
import { getBaseUrl } from '../utils/get-base-url'
import fs from 'fs'
import 'dotenv/config'

export async function getAudioFromVideo(request: Request, response: Response) {
  const { videoUrl } = request.body

  const outputPath =
    process.env.NODE_ENV === 'DEV' ? '../data/music.wav' : 'data/music.wav'

  fs.access(resolve(__dirname, outputPath), fs.constants.F_OK, () => {
    fs.unlink(resolve(__dirname, outputPath), (err) => {
      if (err) {
        console.error(err)
      }
    })
  })

  try {
    await youtubedl.exec(videoUrl, {
      output: resolve(__dirname, outputPath),
      format: 'bestaudio',
      maxFilesize: '10m',
    })

    const fullUrl = getBaseUrl('https', request.hostname)
    const audioUrl = new URL(`/data/music.wav`, fullUrl).toString()

    return response.json({ audioUrl })
  } catch (err) {
    console.error(err)
    return response.status(500).send()
  }
}
