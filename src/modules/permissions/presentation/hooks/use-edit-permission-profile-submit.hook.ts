'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { ExtendedPermissionProfile } from './use-add-permission-profile-submit.hook'
import { useTablePermissionProfile } from '../contexts/table-permission-profiles.context'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'

export function useEditPermissionProfileSubmit() {
  const { id: permissionProfileId } = useTablePermissionProfile()
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
          await deleteFeature(featureId, permissionProfileId)

        if (featuresToAdd.length > 0)
          await addFeatures(featuresToAdd, permissionProfileId)

        toast({
          title: 'Perfil de permissão atualizado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao atualizar o Perfil de permissão',
            description:
              'Ocorreu um problema ao tentar atualizar o Perfil de permissão. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [addFeatures, deleteFeature, selectedApiFeatures, permissionProfileId]
  )

  return { onAction }
}
