'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { EditPermissionProfileMenu } from '.'
import { PermissionProfileForm } from '../permission-profile-form'
import { useDialog } from '@/modules/permissions/presentation/components/edit-permission-profile-menu/edit-permission-profile-menu-provider.component'
import { FEATURES } from '@/modules/permissions/infrastructure/configs/features.config'
import { useEditPermissionProfileSubmit } from '../../hooks/use-edit-permission-profile-submit.hook'
import { EditPermissionProfileForm } from '../edit-permission-profile-form-provider'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'
import { usePermissionProfileStore } from '../../stores/permission-profile.store'
import type { ExtendedPermissionProfile } from '../../hooks/use-add-permission-profile-submit.hook'

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
  const { features } = usePermissionProfileStore()
  const { onAction } = useEditPermissionProfileSubmit()

  return (
    <EditPermissionProfileMenu.Root>
      <EditPermissionProfileMenu.Content>
        <EditPermissionProfileMenu.Header
          title={title}
          description={description}
        />
        <EditPermissionProfileForm.Provider
          features={features}
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
              onSubmit={(permissionProfile: ExtendedPermissionProfile) =>
                onAction(permissionProfile, close)
              }
            />
          </EditPermissionProfileMenu.Footer>
        </EditPermissionProfileForm.Provider>
      </EditPermissionProfileMenu.Content>
    </EditPermissionProfileMenu.Root>
  )
}
