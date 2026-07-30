import type { Infraction } from '../interfaces/infraction.interface'
import type { PostInfractionsPayload } from '../interfaces/post-infractions-payload.interface'

export interface PostInfractionsGateway {
  execute(payload?: PostInfractionsPayload): Promise<Infraction[]>
}
