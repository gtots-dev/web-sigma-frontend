import { useEffect, useRef } from 'react'
import { useInfractionsStore } from '../stores/infractions.store'
import type { InfractionsFiltersInterface } from '../../domain/interfaces/infractions-filters.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function useInfractionsInitialFetch({
  operationId,
  contractId
}: UrlParams) {
  const { getInitialInfractions } = useInfractionsStore()
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (operationId && contractId && !hasFetchedRef.current) {
      hasFetchedRef.current = true
      getInitialInfractions({ operationId, contractId })
    }
  }, [operationId, contractId, getInitialInfractions])

  const handleFilterSubmit = (filters: InfractionsFiltersInterface) => {
    if (operationId && contractId) {
      getInitialInfractions({ operationId, contractId }, filters)
    }
  }

  return { handleFilterSubmit }
}
