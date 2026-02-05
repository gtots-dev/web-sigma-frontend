import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface PostUserFilesGateway {
  execute(user: FormData): Promise<HttpResponseInterface<void>>
}
