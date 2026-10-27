'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { GroupSelector } from '@/modules/shared/presentation/components/group-item-selector'
import type { BaseItem } from '@/modules/shared/presentation/components/group-item-selector/group-item-selector-list.component'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'
import type { IgnoreStatusProcessingUnitsFormType } from '../../schemas/ignore-status-processing-units-form.schema'

interface IgnoreStatusProcessingUnitsFormInputProcessingUnitsProps {
  require?: boolean
  description?: string
  hasPermission?: boolean
}

type SelectorItem = BaseItem & {}

interface SelectorGroup {
  name: string
  items: SelectorItem[]
}

export function IgnoreStatusProcessingUnitsFormInputProcessingUnitsComponent({
  require = false,
  description,
  hasPermission = true
}: IgnoreStatusProcessingUnitsFormInputProcessingUnitsProps) {
  const { control } = useFormContext<IgnoreStatusProcessingUnitsFormType>()
  const { processingUnits, loading } = useProcessingUnitStore()

  const selectorGroups: SelectorGroup[] = useMemo(
    () => [
      {
        name: 'Unidades de Processamento',
        items: processingUnits
          .filter((unit) => typeof unit.id === 'number')
          .map((unit) => ({
            id: unit.id as number,
            name: unit.name
          }))
      }
    ],
    [processingUnits]
  )

  return (
    <FormField
      control={control}
      name="processingUnitIds"
      render={({ field }) => {
        const { value = [], onChange } = field

        return (
          <GroupSelector.Provider
            value={value}
            onChange={onChange}
            groups={selectorGroups}
          >
            <FormItem>
              <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
                U.P.s{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search
                    placeholder={
                      loading
                        ? 'Carregando U.P.s...'
                        : 'Busque pela U.P....'
                    }
                  />
                  <GroupSelector.List<SelectorItem>
                    hasPermission={hasPermission}
                    messagePermission={
                      MESSAGES_STATUS_PROCESSING_UNITS['25.7']
                    }
                    messageItemEmpty="Nenhuma U.P. encontrada"
                    messageGroupEmpty="Nenhuma U.P. encontrada"
                    heading={(group, allSelected, toggleAll) => (
                      <div className="flex items-center justify-between">
                        <span>{group.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleAll(group)}
                          className="underline underline-offset-2 text-primary-300"
                        >
                          {allSelected ? 'Remover seleção' : 'Selecionar todos'}
                        </button>
                      </div>
                    )}
                  >
                    {(item) => (
                      <GroupSelector.Item
                        key={item.id}
                        id={item.id}
                        item={item}
                      >
                        {({ selected }) => (
                          <div className="flex items-center gap-x-4 w-full h-full">
                            <GroupSelector.Checkbox.Check
                              item={item}
                              selected={selected}
                            />
                            <span>{item.name}</span>
                          </div>
                        )}
                      </GroupSelector.Item>
                    )}
                  </GroupSelector.List>
                </GroupSelector.Root>
              </FormControl>

              <FormMessage />
            </FormItem>
          </GroupSelector.Provider>
        )
      }}
    />
  )
}
