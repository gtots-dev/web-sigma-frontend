import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useFormContext } from 'react-hook-form'
import { GroupSelector } from '@/modules/shared/presentation/components/group-item-selector'
import { cn } from '@/modules/shared/presentation/lib/utils'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'

interface UserFormInputPermissionProfilesComponentProps {
  require?: boolean
  description?: string
  permissions: PermissionProfileInterface[]
}

export function UserFormInputPermissionProfilesComponent({
  permissions,
  require,
  description
}: UserFormInputPermissionProfilesComponentProps) {
  const { control } = useFormContext()

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
            groups={[1].map(() => ({
              name: 'Perfis de Permissão',
              items: permissions
            }))}
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
                    messageEmpty={MESSAGES_USERS[5.19]}
                  >
                    {(item) => (
                      <GroupSelector.Item
                        item={item}
                        id={item.id}
                        key={item.id}
                        className="!p-0 hover:bg-transparent"
                      >
                        {({ selected }) => (
                          <div
                            className={cn(
                              'flex items-center gap-x-4 !px-2 !py-1.5 w-full h-full mt-1.5',
                              selected
                                ? 'outline !outline-1 outline-primary-500 dark:outline-primary-300 bg-[#7aabfa0f]'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'
                            )}
                          >
                            <GroupSelector.Checkbox.Check
                              selected={selected}
                              className="ms-2"
                            />
                            <ul className="flex flex-col" key={item.id}>
                              <li>{item.name}</li>
                              <li className="text-xs opacity-60">
                                {item.description}
                              </li>
                            </ul>
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
