import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserFilesService } from '../services/get-user-files.service'
import type { GetUserFilesServiceInterface } from '../../domain/interfaces/get-user-files-service.interface'

export class GetUserFilesFactory {
  static create(): GetUserFilesServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserFilesService(executeRequest)
  }
}
