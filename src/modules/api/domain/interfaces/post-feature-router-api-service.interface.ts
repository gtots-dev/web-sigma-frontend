export interface PostFeatureRouterApiServiceInterface {
  execute(features: number[]): Promise<void>
}
