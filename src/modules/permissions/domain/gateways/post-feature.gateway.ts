export interface PostFeatureGateway {
  execute(features: number[]): Promise<void>
}
