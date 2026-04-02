import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useTrafficFlowStore } from '../stores/traffic-flow.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowFiltersInterface } from '../../domain/interfaces/traffic-flow-filters.interface'
import { removeEmptyFilters } from './use-remove-empty-filters.hook'

export function useGetTrafficFlowSubmit() {
  const { operationId, contractId }: UrlParams = useParams()
  const { getTrafficFlow } = useTrafficFlowStore()
  const onAction = useCallback(
    async (
      filters: TrafficFlowFiltersInterface,
      onSuccess?: (params: TrafficFlowFiltersInterface) => void
    ): Promise<void> => {
      const emptiedFilters = removeEmptyFilters({
        date_range: filters?.date_range,
        time_range: filters?.time_range,
        granularity: filters?.granularity,
        places: filters?.places
      }) as TrafficFlowFiltersInterface

      try {
        await getTrafficFlow({ operationId, contractId }, emptiedFilters)
        toast({
          title: 'Filtrado!',
          variant: 'success'
        })
        onSuccess?.(emptiedFilters)
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao filtrar',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [getTrafficFlow]
  )

  return { onAction }
}
