import type { Infraction } from '../interfaces/infraction.interface'
import type { PostInfractionsPayload } from '../interfaces/post-infractions-payload.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface PostInfractionsGateway {
  execute(
    payload?: PostInfractionsPayload
  ): Promise<HttpResponseInterface<Infraction[]>>
}
