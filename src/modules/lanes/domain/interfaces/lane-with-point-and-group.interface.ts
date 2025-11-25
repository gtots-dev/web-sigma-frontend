export interface LaneWithPointAndGroupInterface {
  lane: {
    name: string
    contract_id: number
    up_id: number
    enabled: boolean
    cfg: string
    id: number
  }
  point_id: number
  group_id: number[]
}
