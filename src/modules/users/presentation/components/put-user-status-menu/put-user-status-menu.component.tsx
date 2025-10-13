'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PutUserStatusMenu } from '.'
import { useTableUser } from '../../contexts/table-user.context'
import { PutUserStatusForm } from '../put-user-status-form-provider'
import { useDialog } from './put-user-status-menu-provider.component'
import { usePutUserStatusSubmit } from '../../hooks/use-update-user-status-submit.hook'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

interface PutUserStatusMenuComponentProps {
  title: string
  description: string
}

export function PutUserStatusMenuComponent({
  title,
  description
}: PutUserStatusMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePutUserStatusSubmit()
  const user = useTableUser()

  return (
    <PutUserStatusMenu.Root>
      <PutUserStatusMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PutUserStatusMenu.Header title={title} description={description} />

        <PutUserStatusForm.Provider user={user} isOpen={isOpen}>
          <UserForm.Form>
            <UserForm.Input.Enabled />
          </UserForm.Form>

          <PutUserStatusMenu.Footer>
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
          </PutUserStatusMenu.Footer>
        </PutUserStatusForm.Provider>
      </PutUserStatusMenu.Content>
    </PutUserStatusMenu.Root>
  )
}
