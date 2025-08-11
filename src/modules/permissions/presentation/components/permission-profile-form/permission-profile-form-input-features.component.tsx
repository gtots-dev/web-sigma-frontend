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
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'

export interface featuresInterface {
  id: number
  name: string
}

export interface groupFeaturesInterface {
  name: string
  features: featuresInterface[]
}

interface PermissionProfileFormInputFeaturesComponentProps {
  require?: boolean
  description?: string
  permissions: groupFeaturesInterface[]
}

export function PermissionProfileFormInputFeaturesComponent({
  require,
  description,
  permissions
}: PermissionProfileFormInputFeaturesComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="features"
      render={({ field }) => {
        const { value = [], onChange } = field

        return (
          <GroupSelector.Provider
            value={value}
            onChange={onChange}
            groups={permissions.map((g) => ({
              name: g.name,
              items: g.features
            }))}
          >
            <FormItem>
              <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
                Permissões{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search placeholder="Busque pelo grupo ou permissão..." />
                  <GroupSelector.List<featuresInterface>
                    messageItemEmpty={MESSAGES_PERMISSIONS[6.6]}
                    messageGroupEmpty={MESSAGES_PERMISSIONS[6.6]}
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
                      <GroupSelector.Item key={item.id} id={item.id}>
                        {({ selected }) => (
                          <div
                            className="flex items-center gap-x-4 w-full h-full"
                            key={item.id}
                          >
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
