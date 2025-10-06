import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

export interface GetFeatureRouterApiServiceInterface {
  execute(): Promise<FeaturesInterface[]>
}
