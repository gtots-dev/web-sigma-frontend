import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostContractService } from '../services/post-contract.service'
import type { PostContractServiceInterface } from '../../domain/interfaces/post-contract-service.interface'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'

export class PostContractFactory {
  static create(): PostContractServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    const jwtDecoder = JwtTokenDecodeFactory.create()
    return new PostContractService(executeRequest, jwtDecoder, formDataConvert)
  }
}
