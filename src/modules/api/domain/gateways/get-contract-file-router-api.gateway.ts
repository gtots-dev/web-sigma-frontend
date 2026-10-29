import type { UrlFileInterface } from '@/modules/contracts/domain/interfaces/url-file.interface'

export interface GetContractFileRouterApiGateway {
  execute(): Promise<UrlFileInterface>
}
