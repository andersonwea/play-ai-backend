import { NextFunction, Request, Response } from 'express'
import youtubedl from 'youtube-dl-exec'

export async function validateVideoDuration(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { videoUrl } = request.body

  if (!videoUrl) {
    return response.status(400).json({ message: 'Video URL required.' })
  }

  try {
    const video = await youtubedl.exec(videoUrl, {
      getDuration: true,
    })

    if (video.stdout.length === 2) {
      return next()
    }

    if (video.failed === true) {
      return response.status(500).send
    }

    const time = video.stdout.split(':')

    if (time.length > 2) {
      return response
        .status(400)
        .json({ message: 'Music is too long to load.' })
    }

    const [minutes] = time

    if (Number(minutes) > 10) {
      return response
        .status(400)
        .json({ message: 'Music is too long to load.' })
    }

    return next()
  } catch (err) {
    console.error(err)
    return response.status(500).send
  }
}
