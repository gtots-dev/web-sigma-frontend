'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { PermissionProfileForm } from '../permission-profile-form'
import { usePatchPermissionProfileStatusForm } from '../../hooks/use-patch-permission-profile-status-form.hook'
import { usePatchPermissionProfileStatusSubmit } from '../../hooks/use-update-permission-profile-status-submit.hook'
import {
  usePermissionProfileById,
  type PermissionProfileItem
} from '../../hooks/use-permission-profile-by-id.hook'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

export interface PatchPermissionProfileStatusModalProps {
  title: string
  description: string
  permissionProfileId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchPermissionProfileStatusFormBodyProps {
  title: string
  description: string
  permissionProfile: PermissionProfileItem
  onClose: () => void
}

function PatchPermissionProfileStatusFormBody({
  title,
  description,
  permissionProfile,
  onClose
}: PatchPermissionProfileStatusFormBodyProps) {
  const { methods } = usePatchPermissionProfileStatusForm({
    id: permissionProfile.id,
    enabled: permissionProfile.enabled
  })
  const { onAction } = usePatchPermissionProfileStatusSubmit()

  const handleSubmit = (data: PermissionProfileEnableAndDisableInterface) =>
    onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Enabled
              name={permissionProfile.name}
            />
          </PermissionProfileForm.Form>
        </ModalShell.Content>
        <ModalShell.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <PermissionProfileForm.Submit<PermissionProfileEnableAndDisableInterface>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchPermissionProfileStatusModal({
  title,
  description,
  permissionProfileId,
  onClose,
  onReturn
}: PatchPermissionProfileStatusModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { permissionProfile, loading } =
    usePermissionProfileById(permissionProfileId)

  if (!loading && !permissionProfile) {
    return (
      <ModalShell.Empty
        title="Perfil de permissão não encontrado"
        description={`O perfil de permissão solicitado com o ID ${permissionProfileId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root contentClassName="lg:!w-[600px] lg:!h-auto">
      <ModalShell.Loading when={loading} />

      {permissionProfile && (
        <PatchPermissionProfileStatusFormBody
          title={title}
          description={description}
          permissionProfile={permissionProfile}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
