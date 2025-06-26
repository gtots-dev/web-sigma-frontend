'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'

export function useAddPermissionProfileSubmit() {
  const { operation } = useOperationStore()
  const { addPermissionProfile, getPermissionProfiles } =
    usePermissionProfileStore()
  const onAction = useCallback(
    async (
      permissionProfile: PermissionProfileInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        await addPermissionProfile({
          ...permissionProfile,
          operation_id: Number(operation.id)
        })
        await getPermissionProfiles()
        toast({
          title: 'Perfil de permissão adicionado com sucesso!',
          description: JSON.stringify(permissionProfile),
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
    [addPermissionProfile, getPermissionProfiles]
  )

  return { onAction }
}
