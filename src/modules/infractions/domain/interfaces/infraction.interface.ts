export interface InfractionMetadata {
  velocity: string
  brand_model: string
  category: string
  type: string
  species: string
  classification: string
  city: string
  state: string
  plate: string
  vehicle_size: string
  profile: string
}

export interface InfractionFile {
  url: string
  name: string
  date: string
  size: string
}

export interface InfractionResponseData {
  file: InfractionFile
  metadata: InfractionMetadata[]
}

export interface Infraction {
  id: number
  up_id: number
  lane_id: number
  response: InfractionResponseData
}
