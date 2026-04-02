import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TrafficFlowInterface } from '../interfaces/traffic-flow.interface'
import type { TrafficFlowFiltersInterface } from '../interfaces/traffic-flow-filters.interface'

export interface PostTrafficFlowServiceGateway {
  execute(
    filters: TrafficFlowFiltersInterface
  ): Promise<HttpResponseInterface<TrafficFlowInterface>>
}
