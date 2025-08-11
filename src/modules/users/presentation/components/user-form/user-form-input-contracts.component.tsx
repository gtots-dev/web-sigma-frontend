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
import { useCacheSelectedBindsStore } from '../../stores/cache-selecteds-binds.store'

interface UserFormInputContractsComponentProps {
  require?: boolean
  description?: string
  contracts: ContractEntity[]
  selectedPermissionProfile?: PermissionProfileEntity
}

export function UserFormInputContractsComponent({
  contracts,
  description,
  require,
  selectedPermissionProfile
}: UserFormInputContractsComponentProps) {
  const { control } = useFormContext()
  const { toggleContractForSelectedProfile, getSelectedProfileWithContracts } =
    useCacheSelectedBindsStore()

  const selectedProfileWithContracts = getSelectedProfileWithContracts()
  const groups = [
    {
      name: 'Contratos',
      items: selectedPermissionProfile ? contracts : []
    }
  ]

  return (
    <FormField
      control={control}
      name="contract_id"
      render={({ field: { value = [], onChange } }) => (
        <GroupSelector.Provider
          value={value}
          onChange={onChange}
          groups={groups}
        >
          <FormItem>
            <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
              {selectedPermissionProfile ? (
                <>
                  <p>Contratos receberão perfil</p>
                  <strong className="text-primary-500 underline underline-offset-4">
                    {selectedPermissionProfile.name}
                  </strong>
                </>
              ) : (
                <p>{`Contratos${require ? ': *' : ':'}`}</p>
              )}
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
                  messageItemEmpty={MESSAGES_CONTRACTS[3.3]}
                  messageGroupEmpty="Selecione um perfil de permissão (Opcional)"
                >
                  {(item) => {
                    const isChecked =
                      selectedProfileWithContracts?.contract_id.includes(
                        item.id
                      ) ?? false

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
                        className="!p-0 hover:bg-transparent"
                      >
                        {() => (
                          <div className={itemClass}>
                            <GroupSelector.Checkbox.Check
                              onClick={() =>
                                toggleContractForSelectedProfile(item.id)
                              }
                              selected={isChecked}
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
      )}
    />
  )
}
