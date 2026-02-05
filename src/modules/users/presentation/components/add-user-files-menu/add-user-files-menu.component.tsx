'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { AddUserFilesMenu } from '.'
import { useDialog } from './add-user-files-menu-provider.component'
import { usePostUserFilesSubmit } from '../../hooks/use-post-user-files-submit.hook'
import type { UserFilesInterface } from '@/modules/users/domain/interfaces/user-files.interface'

interface AddUserFilesMenuComponentProps {
  title: string
  description: string
}

export function AddUserFilesMenuComponent({
  title,
  description
}: AddUserFilesMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = usePostUserFilesSubmit()

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
            onSubmit={(files: UserFilesInterface) => onAction(files, close)}
          />
        </AddUserFilesMenu.Footer>
      </AddUserFilesMenu.Content>
    </AddUserFilesMenu.Root>
  )
}
