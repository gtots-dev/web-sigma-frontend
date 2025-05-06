'use client'

import { UserForm } from '../user-form'
import { AddUserForm } from '../add-user-form-provider'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './add-user-menu-provider.component'
import { AddUserMenu } from '.'
import { useAddUserSubmit } from '../../hooks/use-add-user-submit.hook'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

interface Props {
  title: string
  description: string
}

export function AddUserMenuComponent({ title, description }: Props) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddUserSubmit()

  return (
    <AddUserMenu.Root>
      <AddUserMenu.Content>
        <AddUserMenu.Header title={title} description={description} />

        <AddUserForm.Provider isOpen={isOpen}>
          <UserForm.Form>
            <UserForm.Input.Name require />
            <UserForm.Input.Email require />
            <UserForm.Input.Company require />
            <UserForm.Input.Position require />
            <UserForm.Input.Username require />
            <UserForm.Input.Password require />
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
              onSubmit={(user: UserEntity) => onAction(user, close)}
            />
          </AddUserMenu.Footer>
        </AddUserForm.Provider>
      </AddUserMenu.Content>
    </AddUserMenu.Root>
  )
}
