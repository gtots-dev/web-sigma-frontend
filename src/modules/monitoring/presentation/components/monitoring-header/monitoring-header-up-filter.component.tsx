'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Filter } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'
import { GetProcessingUnitStatusListRouterApiFactory } from '@/modules/api/infrastructure/factories/get-processing-unit-status-list-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function MonitoringHeaderUpFilter() {
  const { operationId, contractId }: UrlParams = useParams()
  const { upErrorFilters, setUpErrorFilters } = useMonitoringContext()
  const [items, setItems] = useState<{ id: string; label: string }[]>([])
  const [loading, setLoading] = useState(() => Boolean(operationId && contractId))

  useEffect(() => {
    if (!operationId || !contractId) return

    let active = true
    const getStatusList = GetProcessingUnitStatusListRouterApiFactory.create({
      operationId,
      contractId
    })
    Promise.resolve()
      .then(() => {
        if (active) setLoading(true)
        return getStatusList.execute()
      })
      .then(({ data }) => {
        if (!active) return
        const mapped = data.map((item) => ({
          id: item.code,
          label: item.description
        }))
        setItems(mapped)
      })
      .catch((err) => {
        console.error('Error fetching UP status list:', err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [operationId, contractId])

  return (
    <MultiSelect
      items={items}
      value={upErrorFilters}
      onChange={setUpErrorFilters}
      placeholder={loading ? 'Carregando status...' : 'Filtrar por Status'}
      notFoundItemPlaceholder="Nenhum status encontrado"
      className="w-full"
      leftIcon={Filter}
      textUppercase
    />
  )
}
