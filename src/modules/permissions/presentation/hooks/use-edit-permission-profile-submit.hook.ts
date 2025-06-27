'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { ExtendedPermissionProfile } from './use-add-permission-profile-submit.hook'
import { useTablePermissionProfile } from '../contexts/table-permission-profiles.context'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'

export function useEditPermissionProfileSubmit() {
  const { id: permissionProfileId } = useTablePermissionProfile()
  const { fetchOperation } = useOperationStore()
  const {
    addFeatures,
    deleteFeature,
    features: currentFeatures
  } = usePermissionProfileStore()

  const onAction = useCallback(
    async (
      permissionProfileForm: ExtendedPermissionProfile,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        const newFeatureIdsSet = new Set(permissionProfileForm.features)

        const currentFeatureIds = currentFeatures.map(
          (f: PermissionProfileWithFeatureInterface) => f.feature_id
        )
        const currentFeatureIdsSet = new Set(currentFeatureIds)

        const featuresToAdd = permissionProfileForm.features.filter(
          (id) => !currentFeatureIdsSet.has(id)
        )

        if (featuresToAdd.length) {
          await addFeatures(featuresToAdd, permissionProfileId)
        }

        const featuresToDelete = currentFeatures.filter(
          (f) => !newFeatureIdsSet.has(f.feature_id)
        )

        if (featuresToDelete.length) {
          await Promise.all(
            featuresToDelete.map((f) =>
              deleteFeature(f.feature_id, permissionProfileId)
            )
          )
        }
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
    [addFeatures, deleteFeature, fetchOperation, currentFeatures]
  )

  return { onAction }
}
