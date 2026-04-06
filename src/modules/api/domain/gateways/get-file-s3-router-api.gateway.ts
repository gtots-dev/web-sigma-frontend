import type { HttpResponseInterface } from '../../../shared/domain/interfaces/http-response.interface'

export interface GetFileS3RouterApiGateway {
  execute: (url: string) => Promise<HttpResponseInterface<File>>
}
