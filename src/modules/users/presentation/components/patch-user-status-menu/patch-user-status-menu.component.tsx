'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PatchUserStatusMenu } from '.'
import { useTableUser } from '../../contexts/table-user.context'
import { PatchUserStatusForm } from '../patch-user-status-form-provider'
import { useDialog } from './patch-user-status-menu-provider.component'
import { usePatchUserStatusSubmit } from '../../hooks/use-patch-user-status-submit.hook'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

interface PatchUserStatusMenuComponentProps {
  title: string
  description: string
}

export function PatchUserStatusMenuComponent({
  title,
  description
}: PatchUserStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePatchUserStatusSubmit()
  const user = useTableUser()

  return (
    <PatchUserStatusMenu.Root>
      <PatchUserStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PatchUserStatusMenu.Header title={title} description={description} />

        <PatchUserStatusForm.Provider user={user} isOpen={isOpen}>
          <UserForm.Form>
            <UserForm.Input.Enabled />
          </UserForm.Form>

          <PatchUserStatusMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <UserForm.Submit
              onSubmit={(userStatus: UserEnableAndDisableInterface) =>
                onAction(userStatus, close)
              }
            />
          </PatchUserStatusMenu.Footer>
        </PatchUserStatusForm.Provider>
      </PatchUserStatusMenu.Content>
    </PatchUserStatusMenu.Root>
  )
}
