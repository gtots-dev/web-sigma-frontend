'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useFormContext } from 'react-hook-form'
import { GroupSelector } from '@/modules/shared/presentation/components/group-item-selector'
import { cn } from '@/modules/shared/presentation/lib/utils'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { useCallback, useMemo } from 'react'

interface UserFormInputContractsComponentProps {
  require?: boolean
  description?: string
  contracts: ContractEntity[]
  selectedPermissionProfile?: PermissionProfileEntity
  hasPermission: boolean
}

export function UserFormInputContractsComponent({
  contracts,
  description,
  require,
  selectedPermissionProfile,
  hasPermission
}: UserFormInputContractsComponentProps) {
  const { control } = useFormContext()

  const groups = useMemo(
    () => [{ name: 'Contratos', items: contracts }],
    [contracts]
  )

  const handleChange = useCallback(
    (newValue: number[], value: any[], onChange: (val: any[]) => void) => {
      if (!selectedPermissionProfile) return

      const index = value.findIndex(
        (v) => v.perm_profile_id === selectedPermissionProfile.id
      )
      const updatedValue = [...value]

      if (index >= 0) {
        updatedValue[index] = {
          ...updatedValue[index],
          contract_ids: newValue
        }
      } else {
        updatedValue.push({
          perm_profile_id: selectedPermissionProfile.id,
          contract_ids: newValue
        })
      }

      onChange(updatedValue)
    },
    [selectedPermissionProfile?.id]
  )

  return (
    <FormField
      control={control}
      name="profiles"
      render={({ field: { value = [], onChange } }) => {
        if (!selectedPermissionProfile) return null

        const profileContracts =
          value.find((v) => v.perm_profile_id === selectedPermissionProfile.id)
            ?.contract_ids ?? []

        return (
          <GroupSelector.Provider
            value={profileContracts}
            onChange={(newValue) => handleChange(newValue, value, onChange)}
            groups={groups}
          >
            <FormItem>
              <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
                <p>Contratos receberão perfil</p>
                <strong className="text-primary-500 underline underline-offset-4">
                  {selectedPermissionProfile.name}
                </strong>
                <HelpMeButtonComponent description={description} />
                <GroupSelector.Toggle className="ms-auto" />
              </FormLabel>

              <FormDescription>
                <strong>
                  Escolha os contratos vinculados ao perfil do usuário.
                </strong>
              </FormDescription>

              <FormDescription className="!mt-0">
                {MESSAGES_PERMISSIONS[6.13]}
              </FormDescription>

              <FormControl>
                <GroupSelector.Root>
                  <GroupSelector.Search placeholder="Busque pelo contrato desejado ..." />
                  <GroupSelector.List<ContractEntity>
                    hasPermission={hasPermission}
                    messagePermission={MESSAGES_CONTRACTS[3.22]}
                    messageItemEmpty={MESSAGES_CONTRACTS[3.3]}
                    messageGroupEmpty="Selecione um perfil de permissão (Opcional)"
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
                    {(item) => {
                      const isChecked = profileContracts.includes(item.id)
                      const itemClass = cn(
                        'flex items-center gap-x-4 !px-2 !py-1.5 w-full h-full mt-1.5',
                        isChecked
                          ? 'outline !outline-1 outline-primary-500 dark:outline-primary-300 bg-[#7aabfa0f]'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      )

                      return (
                        <GroupSelector.Item
                          id={item.id}
                          key={item.id}
                          item={item}
                          className="!p-0 hover:bg-transparent"
                        >
                          {({ selected, toggle }) => (
                            <div className={itemClass}>
                              <GroupSelector.Checkbox.Check
                                onClick={toggle}
                                selected={selected}
                                item={item}
                                className="ms-2"
                              />
                              <ul className="flex flex-col">
                                <li>{item.name}</li>
                                <li className="text-xs opacity-60">
                                  {item.alias}
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
