import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface StatusListItem {
  id: number
  code: string
  description: string
}

export interface GetProcessingUnitStatusListGateway {
  execute(): Promise<HttpResponseInterface<StatusListItem[]>>
}
