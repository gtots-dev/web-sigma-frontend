import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'

export interface PostTrafficFlowRouterApiGateway {
  execute(
    filters: TrafficFlowFiltersInterface
  ): Promise<HttpResponseInterface<TrafficFlowInterface>>
}
