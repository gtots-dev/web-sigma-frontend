'use client'

import { useEffect, useState, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Check, ChevronsUpDown, Square } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'
import { cn } from '@/modules/shared/presentation/lib/utils'

interface ActivityReportContractsComponentProps {
  require?: boolean
  description?: string
}

export function ActivityReportContractsComponent({
  require,
  description
}: ActivityReportContractsComponentProps) {
  const { control } = useFormContext<ActivityReportSchemaType>()
  const { contracts, getContracts } = useContractStore()
  const [loading, setLoading] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = useState(0)

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [contracts, loading])

  useEffect(() => {
    if (contracts.length === 0) {
      setLoading(true)
      getContracts().finally(() => setLoading(false))
    }
  }, [contracts.length, getContracts])

  return (
    <FormField
      control={control}
      name="contract_ids"
      render={({ field }) => {
        const selectedIds: number[] = field.value ?? []

        const toggleContract = (id: number) => {
          if (selectedIds.includes(id)) {
            field.onChange(selectedIds.filter((c) => c !== id))
          } else {
            field.onChange([...selectedIds, id])
          }
        }

        const selectedContracts = contracts.filter((c) =>
          selectedIds.includes(c.id)
        )

        let buttonLabel = 'Selecione contratos'
        if (loading) {
          buttonLabel = 'Carregando...'
        } else if (selectedContracts.length === 1) {
          buttonLabel = selectedContracts[0].name
        } else if (selectedContracts.length > 1) {
          buttonLabel = `${selectedContracts.length} contratos selecionados`
        }

        return (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
              Contratos{require ? ': *' : ':'}
              <HelpMeButtonComponent description={description} />
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    ref={triggerRef}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between dark:text-zinc-50 dark:border-zinc-800',
                      selectedContracts.length === 0 &&
                        !loading &&
                        'text-muted-foreground'
                    )}
                  >
                    {buttonLabel}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="overflow-y-auto p-1"
                  align="start"
                  sideOffset={4}
                  style={{ minWidth: triggerWidth }}
                >
                  {loading ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Carregando...
                    </div>
                  ) : contracts.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Nenhum contrato disponível
                    </div>
                  ) : (
                    contracts.map((contract) => {
                      const isSelected = selectedIds.includes(contract.id)
                      return (
                        <div
                          key={contract.id}
                          className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent',
                            isSelected && 'bg-accent'
                          )}
                          onClick={() => toggleContract(contract.id)}
                        >
                          {isSelected ? (
                            <Check className="h-4 w-4 opacity-100" />
                          ) : (
                            <Square className="h-4 w-4" strokeWidth={1} />
                          )}
                          <span className="truncate">{contract.name}</span>
                        </div>
                      )
                    })
                  )}
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
