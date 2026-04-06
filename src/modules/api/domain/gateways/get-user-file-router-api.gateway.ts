import type { UrlFileInterface } from '@/modules/users/domain/interfaces/url-file.interface'

export interface GetUserFileRouterApiGateway {
  execute(): Promise<UrlFileInterface>
}
