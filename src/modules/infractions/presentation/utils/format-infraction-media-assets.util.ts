import type { Infraction } from '../../domain/interfaces/infraction.interface'

export interface InfractionMediaAsset {
  id: string | number
  src: string
  type: 'image' | 'video'
}

export function isVideoUrl(url: string | undefined | null): boolean {
  if (!url) return false
  const lower = url.toLowerCase()
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.m4v') ||
    lower.endsWith('.mov') ||
    lower.includes('video')
  )
}

export function formatInfractionMediaAssets(
  infraction: Infraction | null
): InfractionMediaAsset[] {
  if (!infraction || !infraction.files) return []
  return infraction.files.map((file, index) => {
    return {
      id: index + 1,
      src: file.url,
      type: isVideoUrl(file.url) ? 'video' : 'image'
    }
  })
}
