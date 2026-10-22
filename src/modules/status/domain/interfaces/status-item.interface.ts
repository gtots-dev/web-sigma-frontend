export type StatusOrigin = 'UP' | 'LANE'

export interface StatusItemInterface {
  id: number
  code: string
  description: string
  origin: StatusOrigin
}
