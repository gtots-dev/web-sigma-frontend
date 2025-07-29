'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import { usePathname } from 'next/navigation'
import { extractOperationId } from '@/modules/system/presentation/utils/export-operation-id.util'

export type ExtendedPermissionProfile = PermissionProfileInterface & {
  features: number[]
}

export function useAddPermissionProfileSubmit() {
  const pathname = usePathname()
  const { addPermissionProfileAndFeatures, getPermissionProfiles } =
    usePermissionProfileStore()
  const onAction = useCallback(
    async (
      permissionProfileForm: ExtendedPermissionProfile,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        const operationId = extractOperationId(pathname)
        await addPermissionProfileAndFeatures({
          operation_id: Number(operationId),
          perm_profile_name: permissionProfileForm.name,
          perm_profile_description: permissionProfileForm.description,
          feature_ids: permissionProfileForm.features
        })
        await getPermissionProfiles()
        toast({
          title: 'Perfil de permissão adicionado com sucesso!',
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao cadastrar o Perfil de permissão',
            description:
              'Ocorreu um problema ao tentar cadastrar o Perfil de permissão. Verifique e tente novamente',
            variant: 'destructive'
          })
        }
      }
    },
    [pathname, addPermissionProfileAndFeatures, getPermissionProfiles]
  )

  return { onAction }
}
