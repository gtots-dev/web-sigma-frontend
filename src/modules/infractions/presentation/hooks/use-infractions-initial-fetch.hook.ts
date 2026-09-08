import { useEffect, useRef } from 'react'
import { useInfractionsStore } from '../stores/infractions.store'
import type { InfractionsFiltersInterface } from '../../domain/interfaces/infractions-filters.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { getDefaultInfractionsFilters } from '../utils/default-infractions-filters.util'

export function useInfractionsInitialFetch({
  operationId,
  contractId
}: UrlParams) {
  const { getInitialInfractions, loading, infractions } = useInfractionsStore()
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (!hasFetchedRef.current && !loading && infractions.length === 0) {
      hasFetchedRef.current = true
      const defaultFilters = getDefaultInfractionsFilters()
      getInitialInfractions({ operationId, contractId }, defaultFilters)
    }
  }, [
    operationId,
    contractId,
    getInitialInfractions,
    loading,
    infractions.length
  ])

  const handleFilterSubmit = (filters: InfractionsFiltersInterface) => {
    if (operationId && contractId) {
      hasFetchedRef.current = true
      getInitialInfractions({ operationId, contractId }, filters)
    }
  }

  return { handleFilterSubmit }
}
