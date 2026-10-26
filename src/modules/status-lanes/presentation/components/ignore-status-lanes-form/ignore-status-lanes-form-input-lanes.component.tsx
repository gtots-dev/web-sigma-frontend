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
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { useLanesOptions } from '../../hooks/use-lanes-options.hook'
import type { IgnoreStatusLanesFormType } from '../../schemas/ignore-status-lanes-form.schema'

interface IgnoreStatusLanesFormInputLanesProps {
  require?: boolean
  description?: string
  hasPermission?: boolean
}

type SelectorItem = BaseItem & {}

interface SelectorGroup {
  name: string
  items: SelectorItem[]
}

export function IgnoreStatusLanesFormInputLanesComponent({
  require = false,
  description,
  hasPermission = true
}: IgnoreStatusLanesFormInputLanesProps) {
  const { control } = useFormContext<IgnoreStatusLanesFormType>()
  const { contractLanes, loading } = useLanesOptions()

  const selectorGroups: SelectorGroup[] = useMemo(
    () => [
      {
        name: 'Faixas',
        items: contractLanes.map(({ lane }) => ({
          id: lane.id,
          name: lane.name
        }))
      }
    ],
    [contractLanes]
  )

  return (
    <FormField
      control={control}
      name="laneIds"
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
                Faixas{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search
                    placeholder={
                      loading ? 'Carregando faixas...' : 'Busque pela faixa...'
                    }
                  />
                  <GroupSelector.List<SelectorItem>
                    hasPermission={hasPermission}
                    messagePermission={MESSAGES_STATUS_LANES['26.7']}
                    messageItemEmpty={MESSAGES_LANE[8.3]}
                    messageGroupEmpty={MESSAGES_LANE[8.3]}
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
