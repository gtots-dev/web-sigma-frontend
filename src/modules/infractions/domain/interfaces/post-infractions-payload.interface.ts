import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { InfractionsFiltersInterface } from './infractions-filters.interface'

export interface PostInfractionsPayload {
  pagination?: PaginationInterface
  filters?: InfractionsFiltersInterface
}
