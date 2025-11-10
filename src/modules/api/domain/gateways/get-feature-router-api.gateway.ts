import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

export interface GetFeatureRouterApiGateway {
  execute(): Promise<FeaturesInterface[]>
}
