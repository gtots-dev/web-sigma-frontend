import type { UrlFileInterface } from '../interfaces/url-file.interface'

export interface GetUserFileGateway {
  execute(): Promise<UrlFileInterface>
}
