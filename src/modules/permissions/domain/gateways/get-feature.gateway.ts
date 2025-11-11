import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { FeaturesInterface } from '../interfaces/features.interface'

export interface GetFeatureGateway {
  execute(token: TokenEntities): Promise<FeaturesInterface[]>
}
