import type { Infraction } from '@/modules/infractions/domain/interfaces/infractions-websocket.interface'

export interface GetInfractionsRouterApiGateway {
  execute(): Promise<Infraction[]>
}
