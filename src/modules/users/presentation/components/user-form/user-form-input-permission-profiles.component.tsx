import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/modules/shared/presentation/lib/utils'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { GroupSelector } from '@/modules/shared/presentation/components/group-item-selector'
import { useState } from 'react'
import { useCacheSelectedBindsStore } from '../../stores/cache-selecteds-binds.store'
interface UserFormInputPermissionProfilesComponentProps {
  require?: boolean
  description?: string
  permissions: PermissionProfileInterface[]
  onSelectProfile?: (profile: PermissionProfileInterface | null) => void
}

export function UserFormInputPermissionProfilesComponent({
  permissions,
  require,
  description,
  onSelectProfile
}: UserFormInputPermissionProfilesComponentProps) {
  const { control, setValue } = useFormContext()
  const [highlightedId, setHighlightedId] = useState<number | null>(null)
  const { setSelectedPermProfile } = useCacheSelectedBindsStore()

  return (
    <FormField
      control={control}
      name="perm_profile_id"
      render={({ field }) => {
        const { value = [], onChange } = field

        return (
          <GroupSelector.Provider
            value={value}
            onChange={onChange}
            groups={[
              {
                name: 'Perfis de Permissão',
                items: permissions
              }
            ]}
          >
            <FormItem>
              <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
                Perfis de Permissões{require ? ': *' : ':'}
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search placeholder="Busque pelo perfil desejado ..." />
                  <GroupSelector.List<PermissionProfileInterface>
                    messageItemEmpty={MESSAGES_USERS[5.19]}
                    messageGroupEmpty={MESSAGES_USERS[5.19]}
                  >
                    {(itemList) => {
                      const isHighlighted = highlightedId === itemList.id

                      return (
                        <GroupSelector.Item
                          className="!p-0 hover:bg-transparent"
                          id={itemList.id}
                          key={itemList.id}
                        >
                          {({ selected }) => (
                            <div className="flex items-center gap-x-4 !ps-2 !py-0 w-full h-full mt-1.5">
                              <div className="ms-2">
                                <GroupSelector.Checkbox.Check
                                  onClick={() => {
                                    setSelectedPermProfile({ id: itemList.id })
                                  }}
                                  item={itemList}
                                  className={cn(
                                    isHighlighted && '!text-primary-500'
                                  )}
                                  selected={selected}
                                />
                              </div>
                              <ul
                                className={cn(
                                  'flex flex-col flex-1 !py-1.5 px-2',
                                  isHighlighted
                                    ? 'outline !outline-1 outline-primary-500 dark:outline-primary-300 bg-[#7aabfa0f]'
                                    : 'hover:!bg-zinc-100 dark:hover:!bg-zinc-900 cursor-pointer'
                                )}
                                onClick={() => {
                                  setHighlightedId((prev) =>
                                    prev === itemList.id ? null : itemList.id
                                  )
                                  onSelectProfile?.(itemList)
                                  setSelectedPermProfile({ id: itemList.id })
                                  setValue('contract_id', [])
                                }}
                              >
                                <li>{itemList.name}</li>
                                <li className="text-xs opacity-60">
                                  {itemList.description}
                                </li>
                              </ul>
                            </div>
                          )}
                        </GroupSelector.Item>
                      )
                    }}
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
