'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchPermissionProfileStatusMenu } from '.'
import { usePatchPermissionProfileStatusSubmit } from '../../hooks/use-update-permission-profile-status-submit.hook'
import { useDialog } from './patch-permission-profile-status-menu-provider.component'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'
import { PatchPermissionProfileStatusForm } from '../patch-permission-profile-status-form-provider'
import { PermissionProfileForm } from '../permission-profile-form'

interface PatchPermissionProfileStatusMenuComponentProps {
  title: string
  description: string
}

export function PatchPermissionProfileStatusMenuComponent({
  title,
  description
}: PatchPermissionProfileStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePatchPermissionProfileStatusSubmit()
  const permissionProfile = useTablePermissionProfile()

  return (
    <PatchPermissionProfileStatusMenu.Root>
      <PatchPermissionProfileStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PatchPermissionProfileStatusMenu.Header
          title={title}
          description={description}
        />

        <PatchPermissionProfileStatusForm.Provider
          permissionProfile={permissionProfile}
          isOpen={isOpen}
        >
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Enabled />
          </PermissionProfileForm.Form>

          <PatchPermissionProfileStatusMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <PermissionProfileForm.Submit
              onSubmit={(permissionProfileStatus: {
                enabled: boolean
                permissionProfileId: number
              }) => onAction(permissionProfileStatus, close)}
            />
          </PatchPermissionProfileStatusMenu.Footer>
        </PatchPermissionProfileStatusForm.Provider>
      </PatchPermissionProfileStatusMenu.Content>
    </PatchPermissionProfileStatusMenu.Root>
  )
}
