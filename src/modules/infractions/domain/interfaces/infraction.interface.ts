export interface InfractionThumbnail {
  url: string
}

export interface InfractionFileItem {
  url: string
  crypt?: number
  thumbnails?: InfractionThumbnail[]
}

export interface Infraction {
  id: number
  lane_id: number
  date: string
  type: number
  violation_id: number | null
  restrictions_id?: number[]
  files?: InfractionFileItem[]
}
