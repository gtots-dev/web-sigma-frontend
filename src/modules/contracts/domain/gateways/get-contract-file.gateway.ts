import type { UrlFileInterface } from '../interfaces/url-file.interface'

export interface GetContractFileGateway {
  execute(): Promise<UrlFileInterface>
}
