import type { TrafficFlowDateRangeInterface } from "./traffic-flow-date-range.interface"
import type { TrafficFlowGranularityInterface } from "./traffic-flow-granularity.interface"
import type { TrafficFlowPlacesInterface } from "./traffic-flow-places.interface"
import type { TrafficFlowTimeRangeInterface } from "./traffic-flow-time-range.interface"

export interface TrafficFlowFiltersInterface {
  places?: TrafficFlowPlacesInterface
  date_range?: TrafficFlowDateRangeInterface
  time_range?: TrafficFlowTimeRangeInterface
  granularity: TrafficFlowGranularityInterface
}
