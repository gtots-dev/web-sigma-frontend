'use client'

import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileText } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function ActivityReportContractsComponent() {
  const { control } = useFormContext<ActivityReportSchemaType>()
  const { operationId }: UrlParams = useParams()
  const { contracts, getContracts } = useContractStore()

  useEffect(() => {
    if (operationId && contracts.length === 0) {
      getContracts({ operationId })
    }
  }, [contracts.length, getContracts, operationId])

  const contractsItems = useMemo(() => {
    return contracts.map((c) => ({
      id: c.id,
      label: c.name
    }))
  }, [contracts])

  return (
    <FormField
      control={control}
      name="contract_ids"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={contractsItems}
              value={field.value ?? []}
              leftIcon={FileText}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Contratos"
              notFoundItemPlaceholder="Nenhum contrato encontrado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
