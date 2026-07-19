import type { Infraction } from '../interfaces/infractions-websocket.interface'

export interface GetInfractionsGateway {
  execute(): Promise<Infraction[]>
}
