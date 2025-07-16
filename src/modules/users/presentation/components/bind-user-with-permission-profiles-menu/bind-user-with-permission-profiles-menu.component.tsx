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
import type { PermissionsProfileIdsWithUserIdInterface } from '@/modules/users/domain/interfaces/permissions-profile-ids-with-user-id.interface'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'

interface BindUserWithPermissionProfilesMenuComponentProps {
  title: string
  description: string
}

export function BindUserWithPermissionProfilesMenuComponent({
  title,
  description
}: BindUserWithPermissionProfilesMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useBindUserWithPermissionProfileSubmit()
  const { userWithPermissionProfiles } = usePermissionProfileWithUserStore()
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
          contracts={[]}
          permissionProfiles={userWithPermissionProfiles}
        >
          <UserForm.Form>
            <UserForm.Input.Profiles permissions={permissionProfiles} />
            <UserForm.Input.Contracts contracts={contracts} />
          </UserForm.Form>
          <BindUserWithPermissionProfilesMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <UserForm.Submit
              onSubmit={(
                permissionProfilesWithUserId: PermissionsProfileIdsWithUserIdInterface
              ) => onAction(permissionProfilesWithUserId, close)}
            />
          </BindUserWithPermissionProfilesMenu.Footer>
        </BindUserWithPermissionProfileForm.Provider>
      </BindUserWithPermissionProfilesMenu.Content>
    </BindUserWithPermissionProfilesMenu.Root>
  )
}
