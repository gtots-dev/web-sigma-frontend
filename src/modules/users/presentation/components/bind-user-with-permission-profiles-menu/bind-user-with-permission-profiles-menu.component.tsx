'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './bind-user-with-permission-profiles-menu-provider.component'
import { BindUserWithPermissionProfilesMenu } from '.'
import { BindUserWithPermissionProfileForm } from '../bind-user-with-permission-profiles-form-provider'
import { useBindUserWithPermissionProfileSubmit } from '../../hooks/use-bind-user-with-permission-profile-submit.hook'
import { usePermissionProfileWithUserStore } from '../../stores/user-permission-profile.store'
import { usePermissionProfileStore } from '@/modules/permissions/presentation/stores/permission-profile.store'
import { useTableUser } from '../../contexts/table-user.context'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'
import { useSelectablePermissionProfile } from '../../hooks/use-selectable-permission-profile.hook'
import type { PermissionsProfileIdsWithUserIdInterface } from '@/modules/users/domain/interfaces/permissions-profile-ids-with-user-id.interface'
interface BindUserWithPermissionProfilesMenuComponentProps {
  title: string
  description: string
  isPermittedViewPermissionsProfile: boolean
  isPermittedViewContracts: boolean
}

export function BindUserWithPermissionProfilesMenuComponent({
  title,
  description,
  isPermittedViewPermissionsProfile,
  isPermittedViewContracts
}: BindUserWithPermissionProfilesMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useBindUserWithPermissionProfileSubmit()
  const { selectedProfile, toggleProfile } =
    useSelectablePermissionProfile(isOpen)
  const { userWithPermissionProfiles, userPermissionProfilesContract } =
    usePermissionProfileWithUserStore()
  const { permissionProfiles } = usePermissionProfileStore()
  const { contracts } = useContractStore()
  const { id: userId } = useTableUser()

  return (
    <BindUserWithPermissionProfilesMenu.Root>
      <BindUserWithPermissionProfilesMenu.Content>
        <BindUserWithPermissionProfilesMenu.Header
          title={title}
          description={description}
        />

        <BindUserWithPermissionProfileForm.Provider
          isOpen={isOpen}
          userId={userId}
          permissionProfiles={userWithPermissionProfiles}
          userPermissionProfileContract={userPermissionProfilesContract}
        >
          <UserForm.Form>
            <UserForm.Input.Profiles
              hasPermission={isPermittedViewPermissionsProfile}
              permissions={permissionProfiles}
              onSelectProfile={toggleProfile}
            />
            <UserForm.Input.Contracts
              hasPermission={isPermittedViewContracts}
              contracts={contracts}
              selectedPermissionProfile={selectedProfile}
            />
          </UserForm.Form>
          <BindUserWithPermissionProfilesMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            {(isPermittedViewContracts ||
              isPermittedViewPermissionsProfile) && (
              <UserForm.Submit
                onSubmit={(
                  permissionProfilesWithUserId: PermissionsProfileIdsWithUserIdInterface
                ) => onAction(permissionProfilesWithUserId, close)}
              />
            )}
          </BindUserWithPermissionProfilesMenu.Footer>
        </BindUserWithPermissionProfileForm.Provider>
      </BindUserWithPermissionProfilesMenu.Content>
    </BindUserWithPermissionProfilesMenu.Root>
  )
}
