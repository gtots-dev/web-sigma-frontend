export interface PostFeatureServiceInterface {
  execute(features: number[]): Promise<void>
}
