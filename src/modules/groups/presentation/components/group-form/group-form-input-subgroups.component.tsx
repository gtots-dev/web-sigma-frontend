import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { useFormContext } from 'react-hook-form'
import { GroupSelector } from '@/modules/shared/presentation/components/group-item-selector'
import type { BaseItem } from '@/modules/shared/presentation/components/group-item-selector/group-item-selector-list.component'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

interface GroupFormInputSubgroupsComponentProps {
  require?: boolean
  description?: string
  subgroups?: GroupWithGroupInterface[]
  hasPermission: boolean
}

type SelectorItem = BaseItem & {}

interface SelectorGroup {
  name: string
  items: SelectorItem[]
}

export function GroupFormInputSubgroupsComponent({
  require,
  description,
  subgroups = [],
  hasPermission
}: GroupFormInputSubgroupsComponentProps) {
  const { control } = useFormContext()

  const selectorGroups: SelectorGroup[] = [
    {
      name: 'Outros grupos',
      items: subgroups.map((li) => ({
        id: li.group.id,
        name: li.group.name
      }))
    }
  ]

  return (
    <FormField
      control={control}
      name="subgroupId"
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
                Grupos{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search placeholder="Busque pelo grupo..." />
                  <GroupSelector.List<SelectorItem>
                    hasPermission={hasPermission}
                    messagePermission={MESSAGES_GROUP[18.21]}
                    messageItemEmpty={MESSAGES_GROUP[18.3]}
                    messageGroupEmpty={MESSAGES_GROUP[18.3]}
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
