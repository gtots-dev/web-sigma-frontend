'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UserForm } from '../user-form'
import { useUserById } from '../../hooks/use-user-by-id.hook'
import { useBindUserWithPermissionProfileForm } from '../../hooks/use-bind-user-with-permission-profiles-form.hook'
import { useBindUserWithPermissionProfileSubmit } from '../../hooks/use-bind-user-with-permission-profile-submit.hook'
import { useSelectablePermissionProfile } from '../../hooks/use-selectable-permission-profile.hook'
import { usePermissionProfileStore } from '@/modules/permissions/presentation/stores/permission-profile.store'
import { usePermissionProfileWithUserStore } from '../../stores/user-permission-profile.store'
import { useContractStore } from '@/modules/contracts/presentation/stores/contract.store'
import type { PermissionsProfileIdsWithUserIdInterface } from '@/modules/users/domain/interfaces/permissions-profile-ids-with-user-id.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface BindUserPermissionProfilesModalProps {
  title: string
  description: string
  userId: number
  isPermittedViewContracts: boolean
  isPermittedViewPermissionsProfile: boolean
  onClose?: () => void
  onReturn?: () => void
}

export function BindUserPermissionProfilesModal({
  title,
  description,
  userId,
  isPermittedViewContracts,
  isPermittedViewPermissionsProfile,
  onClose,
  onReturn
}: BindUserPermissionProfilesModalProps) {
  const { operationId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { user, loading: loadingUser } = useUserById(userId)
  const { onAction } = useBindUserWithPermissionProfileSubmit()
  const { permissionProfiles, getPermissionProfiles } =
    usePermissionProfileStore()
  const { contracts, getContracts } = useContractStore()
  const {
    userWithPermissionProfiles,
    userPermissionProfilesContract,
    getUserWithPermissionProfiles,
    getUserPermissionProfilesContract,
    clearUserPermissionProfilesContract
  } = usePermissionProfileWithUserStore()
  const { selectedProfile, toggleProfile, resetProfile } =
    useSelectablePermissionProfile()
  const [loadingRelations, setLoadingRelations] = useState(
    isPermittedViewPermissionsProfile || isPermittedViewContracts
  )

  useEffect(() => {
    let active = true
    clearUserPermissionProfilesContract()

    if (!isPermittedViewPermissionsProfile && !isPermittedViewContracts) {
      setLoadingRelations(false)
      return
    }

    ;(async () => {
      try {
        const [loadedUserProfiles] = await Promise.all([
          isPermittedViewPermissionsProfile
            ? getUserWithPermissionProfiles({
                operationId,
                userId: String(userId)
              }).catch(() => null)
            : Promise.resolve(null),
          isPermittedViewPermissionsProfile
            ? getPermissionProfiles({ operationId }).catch(() => null)
            : Promise.resolve(null),
          isPermittedViewContracts
            ? getContracts({ operationId }).catch(() => null)
            : Promise.resolve(null)
        ])

        if (isPermittedViewPermissionsProfile && loadedUserProfiles) {
          await Promise.all(
            loadedUserProfiles.map(
              async ({ id: permissionProfileId, user_id: uId }) => {
                await getUserPermissionProfilesContract({
                  operationId,
                  permissionProfileId: String(permissionProfileId),
                  userId: String(uId)
                }).catch(() => undefined)
              }
            )
          )
        }
      } finally {
        if (active) setLoadingRelations(false)
      }
    })()

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationId, userId])

  const methods = useBindUserWithPermissionProfileForm({
    permissionProfiles: userWithPermissionProfiles,
    userPermissionProfileContract: userPermissionProfilesContract,
    userId
  })

  const loading = loadingUser || loadingRelations

  if (!loading && !user) {
    return (
      <ModalShell.Empty
        title="Usuário não encontrado"
        description={`O usuário solicitado com o ID ${userId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && user && (
        <>
          <ModalShell.Header title={title} description={description} />
          <FormProvider {...methods}>
            <ModalShell.Content>
              <UserForm.Form>
                <UserForm.Input.Profiles
                  hasPermission={isPermittedViewPermissionsProfile}
                  permissions={permissionProfiles}
                  onSelectProfile={toggleProfile}
                />

                {selectedProfile && (
                  <UserForm.Input.Contracts
                    hasPermission={isPermittedViewContracts}
                    selectedPermissionProfile={selectedProfile}
                    contracts={contracts}
                  />
                )}
              </UserForm.Form>
            </ModalShell.Content>
            <ModalShell.Footer>
              <Button
                className="w-full sm:w-[150px]"
                variant="outline"
                type="button"
                onClick={() => {
                  resetProfile()
                  handleClose()
                }}
              >
                Cancelar
              </Button>
              <UserForm.Submit
                onSubmit={(
                  permissionProfilesIds: PermissionsProfileIdsWithUserIdInterface
                ) =>
                  onAction(permissionProfilesIds, () => {
                    resetProfile()
                    handleClose()
                  })
                }
              />
            </ModalShell.Footer>
          </FormProvider>
        </>
      )}
    </ModalShell.Root>
  )
}
