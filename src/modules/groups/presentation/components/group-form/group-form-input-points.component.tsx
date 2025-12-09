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
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

interface GroupFormInputPointsComponentProps {
  require?: boolean
  description?: string
  points?: PointWithGroupInterface[]
}

type SelectorItem = BaseItem & {}

interface SelectorGroup {
  name: string
  items: SelectorItem[]
}

export function GroupFormInputPointsComponent({
  require,
  description,
  points = [],
}: GroupFormInputPointsComponentProps) {
  const { control } = useFormContext()

  const selectorGroups: SelectorGroup[] = [
    {
      name: 'Pontos',
      items: points.map((li) => ({
        id: li.point.id,
        name: li.point.name
      }))
    }
  ]

  return (
    <FormField
      control={control}
      name="pointId"
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
                Pontos{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search placeholder="Busque pelo ponto..." />
                  <GroupSelector.List<SelectorItem>
                    messageItemEmpty={MESSAGES_POINT[14.3]}
                    messageGroupEmpty={MESSAGES_POINT[14.3]}
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
