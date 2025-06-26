'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { AddPermissionProfileMenu } from '.'
import { PermissionProfileForm } from '../permission-profile-form'
import { AddPermissionProfileForm } from '../add-permission-profile-form-provider'
import { useDialog } from '@/modules/permissions/presentation/components/add-permission-profile-menu/add-permission-profile-menu-provider.component'
import { FEATURES } from '@/modules/permissions/infrastructure/configs/features.config'
import { useAddPermissionProfileSubmit } from '../../hooks/use-add-permission-profile-submit.hook'
import type { PermissionProfilesInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

interface AddPermissionProfileMenuComponentProps {
  title: string
  description: string
}

export function AddPermissionProfileMenuComponent({
  title,
  description
}: AddPermissionProfileMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddPermissionProfileSubmit()

  return (
    <AddPermissionProfileMenu.Root>
      <AddPermissionProfileMenu.Content>
        <AddPermissionProfileMenu.Header
          title={title}
          description={description}
        />
        <AddPermissionProfileForm.Provider isOpen={isOpen}>
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Name require />
            <PermissionProfileForm.Input.Features
              require
              permissions={FEATURES}
            />
          </PermissionProfileForm.Form>

          <AddPermissionProfileMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <PermissionProfileForm.Submit
              onSubmit={(permissionProfile: PermissionProfilesInterface) =>
                onAction(permissionProfile, close)
              }
            />
          </AddPermissionProfileMenu.Footer>
        </AddPermissionProfileForm.Provider>
      </AddPermissionProfileMenu.Content>
    </AddPermissionProfileMenu.Root>
  )
}
