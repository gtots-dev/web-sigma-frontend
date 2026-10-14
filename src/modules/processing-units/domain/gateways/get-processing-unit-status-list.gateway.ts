import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ProcessingUnitStatusInterface } from '../interfaces/processing-unit-status-interface'

export interface GetProcessingUnitStatusListGateway {
  execute(): Promise<HttpResponseInterface<ProcessingUnitStatusInterface[]>>
}
