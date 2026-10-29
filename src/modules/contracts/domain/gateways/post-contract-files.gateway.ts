import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface PostContractFilesGateway {
  execute(files: FormData): Promise<HttpResponseInterface<void>>
}
