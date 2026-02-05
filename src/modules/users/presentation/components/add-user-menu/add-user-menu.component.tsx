'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './add-user-menu-provider.component'
import { AddUserMenu } from '.'
import { useAddUserSubmit } from '../../hooks/use-post-user-submit.hook'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

interface AddUserMenuComponentProps {
  title: string
  description: string
}

export function AddUserMenuComponent({
  title,
  description
}: AddUserMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddUserSubmit()

  return (
    <AddUserMenu.Root isOpen={isOpen} close={close}>
      <AddUserMenu.Content>
        <AddUserMenu.Header title={title} description={description} />

        <UserForm.Form>
          <UserForm.Input.Name require />
          <UserForm.Input.Email require />
          <UserForm.Input.Company />
          <UserForm.Input.Position />
          <UserForm.Input.Username require />
          <UserForm.Input.PasswordRegDeadline />
          <UserForm.Input.Files />
          <UserForm.Input.Description />
        </UserForm.Form>

        <AddUserMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <UserForm.Submit
            onSubmit={(user: UserWithFiles) => onAction(user, close)}
          />
        </AddUserMenu.Footer>
      </AddUserMenu.Content>
    </AddUserMenu.Root>
  )
}
