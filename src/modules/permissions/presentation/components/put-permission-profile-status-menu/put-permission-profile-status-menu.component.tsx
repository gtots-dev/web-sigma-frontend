'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PutPermissionProfileStatusMenu } from '.'
import { usePutPermissionProfileStatusSubmit } from '../../hooks/use-update-permission-profile-status-submit.hook'
import { useDialog } from './put-permission-profile-status-menu-provider.component'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'
import { PutPermissionProfileStatusForm } from '../put-permission-profile-status-form-provider'
import { PermissionProfileForm } from '../permission-profile-form'

interface PutPermissionProfileStatusMenuComponentProps {
  title: string
  description: string
}

export function PutPermissionProfileStatusMenuComponent({
  title,
  description
}: PutPermissionProfileStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePutPermissionProfileStatusSubmit()
  const permissionProfile = useTablePermissionProfile()

  return (
    <PutPermissionProfileStatusMenu.Root>
      <PutPermissionProfileStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PutPermissionProfileStatusMenu.Header
          title={title}
          description={description}
        />

        <PutPermissionProfileStatusForm.Provider
          permissionProfile={permissionProfile}
          isOpen={isOpen}
        >
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Enabled />
          </PermissionProfileForm.Form>

          <PutPermissionProfileStatusMenu.Footer>
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
          </PutPermissionProfileStatusMenu.Footer>
        </PutPermissionProfileStatusForm.Provider>
      </PutPermissionProfileStatusMenu.Content>
    </PutPermissionProfileStatusMenu.Root>
  )
}
