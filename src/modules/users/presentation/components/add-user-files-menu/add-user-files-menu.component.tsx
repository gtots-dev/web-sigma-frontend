'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { AddUserFilesMenu } from '.'
import { useAddUserSubmit } from '../../hooks/use-post-user-submit.hook'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { useDialog } from './add-user-files-menu-provider.component'

interface AddUserFilesMenuComponentProps {
  title: string
  description: string
}

export function AddUserFilesMenuComponent({
  title,
  description
}: AddUserFilesMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useAddUserSubmit()

  return (
    <AddUserFilesMenu.Root isOpen={isOpen} close={close}>
      <AddUserFilesMenu.Content className="lg:!w-[700px] lg:!h-auto">
        <AddUserFilesMenu.Header title={title} description={description} />

        <UserForm.Form>
          <UserForm.Input.Files />
        </UserForm.Form>

        <AddUserFilesMenu.Footer>
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
        </AddUserFilesMenu.Footer>
      </AddUserFilesMenu.Content>
    </AddUserFilesMenu.Root>
  )
}
