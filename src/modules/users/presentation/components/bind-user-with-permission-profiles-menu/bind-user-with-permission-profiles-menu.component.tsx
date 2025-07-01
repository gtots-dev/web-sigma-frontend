'use client'

import { UserForm } from '../user-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './bind-user-with-permission-profiles-menu-provider.component'
import { BindUserWithPermissionProfilesMenu } from '.'
import { BindUserWithPermissionProfileForm } from '../bind-user-with-permission-profiles-form-provider'
import { useBindUserWithPermissionProfileSubmit } from '../../hooks/use-bind-user-with-permission-profile-submit.hook'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

interface BindUserWithPermissionProfilesMenuComponentProps {
  title: string
  description: string
}

export function BindUserWithPermissionProfilesMenuComponent({
  title,
  description
}: BindUserWithPermissionProfilesMenuComponentProps) {
  const { isOpen, close } = useDialog()
  const { onAction } = useBindUserWithPermissionProfileSubmit()

  return (
    <BindUserWithPermissionProfilesMenu.Root>
      <BindUserWithPermissionProfilesMenu.Content>
        <BindUserWithPermissionProfilesMenu.Header
          title={title}
          description={description}
        />

        <BindUserWithPermissionProfileForm.Provider
          isOpen={isOpen}
          permissionProfiles={[
            {
              id: 1,
              user_id: 1,
              perm_profile_id: 1
            },
            {
              id: 2,
              user_id: 1,
              perm_profile_id: 2
            },
            {
              id: 3,
              user_id: 1,
              perm_profile_id: 3
            }
          ]}
        >
          <UserForm.Form>
            <UserForm.Input.Profiles
              permissions={[
                {
                  name: 'Administrador',
                  operation_id: 1,
                  description:
                    'Usuário responsável por gerenciar todos os recursos do sistema.',
                  id: 1
                },
                {
                  name: 'Coordenador',
                  operation_id: 1,
                  description:
                    'Usuário responsável por supervisionar e orientar outros usuários.',
                  id: 2
                },
                {
                  name: 'Desenvolvedor',
                  operation_id: 1,
                  description:
                    'Usuário especializado na manutenção e evolução do sistema.',
                  id: 3
                }
              ]}
            />
          </UserForm.Form>
          <BindUserWithPermissionProfilesMenu.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              onClick={close}
            >
              Cancelar
            </Button>
            <UserForm.Submit
              onSubmit={(permissionProfiles: PermissionProfileEntity['id'][]) =>
                onAction(permissionProfiles, close)
              }
            />
          </BindUserWithPermissionProfilesMenu.Footer>
        </BindUserWithPermissionProfileForm.Provider>
      </BindUserWithPermissionProfilesMenu.Content>
    </BindUserWithPermissionProfilesMenu.Root>
  )
}
