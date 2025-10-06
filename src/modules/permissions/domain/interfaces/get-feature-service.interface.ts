import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { FeaturesInterface } from './features.interface'

export interface GetFeatureServiceInterface {
  execute(token: TokenEntities): Promise<FeaturesInterface[]>
}
