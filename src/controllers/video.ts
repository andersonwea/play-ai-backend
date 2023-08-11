import { Request, Response } from 'express'
import { Client } from 'youtubei'

const youtube = new Client()
const baseUrl = 'https://www.youtube.com/watch?v='

export async function searchVideo(request: Request, response: Response) {
  const { search } = request.body

  if (!search) {
    return response.status(400).json({ message: 'Search is required.' })
  }

  try {
    const videosFindedInfo = await youtube.search(search)

    if (!videosFindedInfo) {
      return response.status(404).json({ message: 'Video not found.' })
    }

    const videoId = videosFindedInfo.items[0].id

    const videoUrl = baseUrl.concat(videoId)

    return response.json({ videoUrl })
  } catch (err) {
    return response.status(500).send()
  }
}
