'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfilesInterface } from '../../domain/interfaces/permission-profiles.interface'

export function useAddPermissionProfileSubmit() {
  const onAction = useCallback(
    async (
      permissionProfile: PermissionProfilesInterface,
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
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
    []
  )

  return { onAction }
}
