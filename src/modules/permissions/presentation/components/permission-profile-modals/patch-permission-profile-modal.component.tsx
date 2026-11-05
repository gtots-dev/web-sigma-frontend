'use client'

import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { PermissionProfileForm } from '../permission-profile-form'
import { useEditPermissionProfileForm } from '../../hooks/use-edit-permission-profile-form.hook'
import { useEditPermissionProfileSubmit } from '../../hooks/use-edit-permission-profile-submit.hook'
import { usePermissionProfileById } from '../../hooks/use-permission-profile-by-id.hook'
import { usePermissionProfileStore } from '../../stores/permission-profile.store'
import { useFeatureStore } from '../../stores/feature.store'
import type { ExtendedPermissionProfile } from '../../hooks/use-add-permission-profile-submit.hook'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface PatchPermissionProfileModalProps {
  title: string
  description: string
  permissionProfileId: number
  onClose?: () => void
  onReturn?: () => void
}

interface PatchPermissionProfileFormBodyProps {
  title: string
  description: string
  permissionProfile: PermissionProfileInterface
  permissionProfileFeatures: PermissionProfileWithFeatureInterface[]
  features: FeaturesInterface[]
  onClose: () => void
}

function PatchPermissionProfileFormBody({
  title,
  description,
  permissionProfile,
  permissionProfileFeatures,
  features,
  onClose
}: PatchPermissionProfileFormBodyProps) {
  const { methods } = useEditPermissionProfileForm(
    permissionProfile,
    permissionProfileFeatures
  )
  const { onAction } = useEditPermissionProfileSubmit(permissionProfile.id)

  const handleSubmit = (data: ExtendedPermissionProfile) =>
    onAction(data, onClose)

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Name />
            <PermissionProfileForm.Input.Description />
            <PermissionProfileForm.Input.Features permissions={features} />
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
          <PermissionProfileForm.Submit<ExtendedPermissionProfile>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </SmartFormProvider>
  )
}

export function PatchPermissionProfileModal({
  title,
  description,
  permissionProfileId,
  onClose,
  onReturn
}: PatchPermissionProfileModalProps) {
  const { operationId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { permissionProfile, loading: loadingProfile } =
    usePermissionProfileById(permissionProfileId)
  const { features: permissionProfileFeatures, getPermissionProfileFeatures } =
    usePermissionProfileStore()
  const { features, getFeatures } = useFeatureStore()
  const [loadingFeatures, setLoadingFeatures] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([
      getFeatures(),
      getPermissionProfileFeatures({
        operationId,
        permissionProfileId: String(permissionProfileId)
      })
    ])
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoadingFeatures(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = loadingProfile || loadingFeatures

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
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && permissionProfile && (
        <PatchPermissionProfileFormBody
          title={title}
          description={description}
          permissionProfile={permissionProfile}
          permissionProfileFeatures={permissionProfileFeatures}
          features={features}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
