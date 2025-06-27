'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'

export function useEditPermissionProfileSubmit() {
  const onAction = useCallback(
    async (
      permissionProfile: PermissionProfileInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        toast({
          title: 'Perfil de permissão atualizado com sucesso!',
          description: JSON.stringify(permissionProfile),
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
    []
  )

  return { onAction }
}
