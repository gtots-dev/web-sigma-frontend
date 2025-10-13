'use client'

import { UserForm } from '../user-form'
import { PutUserPasswordResetForm } from '../put-user-password-reset-form-provider'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './put-user-password-reset-menu-provider.component'
import { PutUserPasswordResetMenu } from '.'
import { useTableUser } from '../../contexts/table-user.context'
import { usePutUserPasswordResetSubmit } from '../../hooks/use-update-user-password-reset-submit.hook'
import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'

interface PutUserPasswordResetMenuComponentProps {
  title: string
  description: string
}

export function PutUserPasswordResetMenuComponent({
  title,
  description
}: PutUserPasswordResetMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePutUserPasswordResetSubmit()
  const user = useTableUser()

  return (
    <PutUserPasswordResetMenu.Root>
      <PutUserPasswordResetMenu.Content className="lg:!w-[600px] lg:!h-auto">
        <PutUserPasswordResetMenu.Header
          title={title}
          description={description}
        />

        <PutUserPasswordResetForm.Provider user={user} isOpen={isOpen}>
          <UserForm.Form>
            <UserForm.Input.PasswordRegDeadline />
          </UserForm.Form>

          <PutUserPasswordResetMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <UserForm.Submit
              onSubmit={(userPasswordReset: UserPasswordResetInterface) =>
                onAction(userPasswordReset, close)
              }
            />
          </PutUserPasswordResetMenu.Footer>
        </PutUserPasswordResetForm.Provider>
      </PutUserPasswordResetMenu.Content>
    </PutUserPasswordResetMenu.Root>
  )
}
