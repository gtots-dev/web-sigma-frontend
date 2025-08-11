'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionsProfileIdsWithUserIdInterface } from '../../domain/interfaces/permissions-profile-ids-with-user-id.interface'
import { useCacheSelectedBindsStore } from '../stores/cache-selecteds-binds.store'

export function useBindUserWithPermissionProfileSubmit() {
  const bindings = useCacheSelectedBindsStore((state) => state.bindings)
  const onAction = useCallback(
    async (
      {
        user_id: userId,
        perm_profile_id: selectedPermissionsProfiles
      }: PermissionsProfileIdsWithUserIdInterface,
      onSuccess?: VoidFunction
    ): Promise<void> => {
      try {
        toast({
          title: 'Perfis de permissão vinculados com sucesso!',
          description: `Os perfis selecionados foram atribuídos ao usuário.`,
          variant: 'success'
        })
        onSuccess?.()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          toast({
            title: 'Erro ao vincular perfis de permissão',
            description:
              'Não foi possível vincular os perfis ao usuário. Tente novamente ou entre em contato com o suporte.',
            variant: 'destructive'
          })
        }
      }
    },
    [bindings]
  )
  return { onAction }
}
