'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { EditPermissionProfileMenu } from '.'
import { PermissionProfileForm } from '../permission-profile-form'
import { useDialog } from '@/modules/permissions/presentation/components/edit-permission-profile-menu/edit-permission-profile-menu-provider.component'
import { FEATURES } from '@/modules/permissions/infrastructure/configs/features.config'
import { useEditPermissionProfileSubmit } from '../../hooks/use-edit-permission-profile-submit.hook'
import { EditPermissionProfileForm } from '../edit-permission-profile-form-provider'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

interface EditPermissionProfileMenuComponentProps {
  title: string
  description: string
}

export function EditPermissionProfileMenuComponent({
  title,
  description
}: EditPermissionProfileMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const permissionProfile = useTablePermissionProfile()
  const { onAction } = useEditPermissionProfileSubmit()

  return (
    <EditPermissionProfileMenu.Root>
      <EditPermissionProfileMenu.Content>
        <EditPermissionProfileMenu.Header
          title={title}
          description={description}
        />
        <EditPermissionProfileForm.Provider
          features={[
            {
              id: 8,
              feature_id: 4,
              perm_profile_id: 10
            },
            {
              id: 11,
              feature_id: 1,
              perm_profile_id: 10
            },
            {
              id: 12,
              feature_id: 2,
              perm_profile_id: 10
            },
            {
              id: 13,
              feature_id: 3,
              perm_profile_id: 10
            }
          ]}
          profile={permissionProfile}
          isOpen={isOpen}
        >
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Name />
            <PermissionProfileForm.Input.Description />
            <PermissionProfileForm.Input.Features permissions={FEATURES} />
          </PermissionProfileForm.Form>

          <EditPermissionProfileMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <PermissionProfileForm.Submit
              onSubmit={(permissionProfile: PermissionProfileInterface) =>
                onAction(permissionProfile, close)
              }
            />
          </EditPermissionProfileMenu.Footer>
        </EditPermissionProfileForm.Provider>
      </EditPermissionProfileMenu.Content>
    </EditPermissionProfileMenu.Root>
  )
}
