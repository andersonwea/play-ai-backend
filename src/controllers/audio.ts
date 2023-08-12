import { Request, Response } from 'express'
import { resolve } from 'path'
import youtubedl from 'youtube-dl-exec'
import { getBaseUrl } from '../utils/get-base-url'

export async function getAudioFromVideo(request: Request, response: Response) {
  const { videoUrl } = request.body

  if (!videoUrl) {
    return response.status(400).json({ message: 'Video URL required.' })
  }

  try {
    await youtubedl.exec(videoUrl, {
      output: resolve(__dirname, '../data/music'),
      extractAudio: true,
      audioFormat: 'wav',
    })

    const fullUrl = getBaseUrl(request.protocol, request.hostname)
    const audioUrl = new URL(`/data/music.wav`, fullUrl).toString()

    return response.json({ audioUrl })
  } catch (err) {
    return response.status(500).send()
  }
}
