import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'
import type { PostInfractionsPayload } from '@/modules/infractions/domain/interfaces/post-infractions-payload.interface'

export interface PostInfractionsRouterApiGateway {
  execute(payload?: PostInfractionsPayload): Promise<Infraction[]>
}
