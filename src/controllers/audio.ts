import { Request, Response } from 'express'
import youtubedl from 'youtube-dl-exec'

export async function getAudioFromVideo(request: Request, response: Response) {
  const { videoUrl } = request.body

  if (!videoUrl) {
    return response.status(400).json({ message: 'Video URL required.' })
  }

  try {
    const videoInfo = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    })

    const index = videoInfo.formats.findIndex(
      (format) => format.format_id === '251',
    )

    const audioUrl = videoInfo.formats[index].url

    return response.json({ audioUrl })
  } catch (err) {
    return response.status(500).send()
  }
}
