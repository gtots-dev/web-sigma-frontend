import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'

export interface GetInfractionsRouterApiGateway {
  execute(): Promise<Infraction[]>
}
