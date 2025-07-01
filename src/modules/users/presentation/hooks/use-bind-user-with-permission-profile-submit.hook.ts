import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

export function useBindUserWithPermissionProfileSubmit() {
  const onAction = useCallback(
    async (
      permissionProfiles: PermissionProfileEntity['id'][],
      onSuccess: VoidFunction
    ): Promise<void> => {
      try {
        toast({
          title: 'Perfis de permissão vinculados com sucesso!',
          description: `Os perfis selecionados foram atribuídos ao usuário. ${JSON.stringify(permissionProfiles)}`,
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
    []
  )

  return { onAction }
}
