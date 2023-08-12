import { Request, Response } from 'express'
import { resolve } from 'path'
import youtubedl from 'youtube-dl-exec'
import { getBaseUrl } from '../utils/get-base-url'
import fs from 'fs'

export async function getAudioFromVideo(request: Request, response: Response) {
  const { videoUrl } = request.body

  fs.access(
    resolve(__dirname, '../data/music.wav'),
    fs.constants.F_OK,
    (err) => {
      if (err) {
        return
      }

      fs.unlink(resolve(__dirname, '../data/music.wav'), (err) => {
        if (err) {
          console.error(err)
        }
      })
    },
  )

  try {
    await youtubedl.exec(videoUrl, {
      output: resolve(__dirname, '../data/music.wav'),
      format: 'bestaudio',
      maxFilesize: '10m',
    })

    const fullUrl = getBaseUrl(request.protocol, request.hostname)
    const audioUrl = new URL(`/data/music.wav`, fullUrl).toString()

    return response.json({ audioUrl })
  } catch (err) {
    console.error(err)
    return response.status(500).send()
  }
}
