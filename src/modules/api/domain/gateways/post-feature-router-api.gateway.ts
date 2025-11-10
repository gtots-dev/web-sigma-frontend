export interface PostFeatureRouterApiGateway {
  execute(features: number[]): Promise<void>
}
