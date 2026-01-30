'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { ExtendedPermissionProfile } from './use-add-permission-profile-submit.hook'
import { useTablePermissionProfile } from '../contexts/table-permission-profiles.context'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export function useEditPermissionProfileSubmit() {
  const { id: permissionProfileId } = useTablePermissionProfile()
  const { operationId }: UrlParams = useParams()
  const {
    addFeatures,
    deleteFeature,
    features: selectedApiFeatures
  } = usePermissionProfileStore()

  const onAction = useCallback(
    async (
      { features: selectedFormFeatures }: ExtendedPermissionProfile,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        const selectedApiFeatureIds = selectedApiFeatures.map(
          ({ feature_id }: PermissionProfileWithFeatureInterface) => feature_id
        )

        const featuresToDelete = selectedApiFeatureIds.filter(
          (featureId) => !selectedFormFeatures.includes(featureId)
        )

        const featuresToAdd = selectedFormFeatures.filter(
          (featureId) => !selectedApiFeatureIds.includes(featureId)
        )

        for (const featureId of featuresToDelete)
          await deleteFeature({
            featureId: String(featureId),
            permissionProfileId: String(permissionProfileId),
            operationId
          })

        if (featuresToAdd.length > 0)
          await addFeatures(featuresToAdd, {
            permissionProfileId: String(permissionProfileId),
            operationId
          })

        toast({
          title: 'Perfil de permissão atualizado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o Perfil de permissão',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    },
    [
      addFeatures,
      deleteFeature,
      selectedApiFeatures,
      permissionProfileId,
      operationId
    ]
  )

  return { onAction }
}
