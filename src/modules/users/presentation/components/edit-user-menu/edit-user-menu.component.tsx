'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-user-menu-provider.component'
import { EditUserMenu } from '.'
import { EditUserForm } from '../edit-user-form-provider'
import { useTableUser } from '../../contexts/table-user.context'
import { useEditUserSubmit } from '../../hooks/use-update-user-submit.hook'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

interface Props {
  title: string
  description: string
}

export function EditUserMenuComponent({ title, description }: Props) {
  const { isOpen, close } = useDialog()
  const { onAction } = useEditUserSubmit()
  const user = useTableUser()

  return (
    <EditUserMenu.Root>
      <EditUserMenu.Content>
        <EditUserMenu.Header title={title} description={description} />

        <EditUserForm.Provider isOpen={isOpen} user={user}>
          <UserForm.Form>
            <UserForm.Input.Name />
            <UserForm.Input.Email />
            <UserForm.Input.Company />
            <UserForm.Input.Position />
            <UserForm.Input.Username />
            <UserForm.Input.Files />
            <UserForm.Input.Description />
            <UserForm.Input.Enabled />
          </UserForm.Form>

          <EditUserMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <UserForm.Submit
              onSubmit={(user: UserEntity) => {
                onAction(user)
                close()
              }}
            />
          </EditUserMenu.Footer>
        </EditUserForm.Provider>
      </EditUserMenu.Content>
    </EditUserMenu.Root>
  )
}
