'use client'

import { useCallback } from 'react'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { useTwoFactorStore } from '../stores/two-factor.store'
import { useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import type { TwoFactorInterface } from '../../domain/interfaces/two-factor.interface'
import { useSession } from 'next-auth/react'

export function usePostTwoFactorSubmit() {
  const router = useRouter()
  const { update } = useSession()
  const { postTwoFactorVerify } = useTwoFactorStore()

  const onAction = useCallback(
    async (twoFactor: TwoFactorInterface): Promise<void> => {
      try {
        const { data } = await postTwoFactorVerify(twoFactor)

        await update({
          access_token: data.access_token
        })

        toast({
          title: 'Autenticação realizada com sucesso!',
          variant: 'success'
        })

        router.replace(PATHNAMES.SYSTEM)
      } catch (error) {
        toast({
          title: 'Erro ao autenticar!',
          description: error.message,
          variant: 'destructive'
        })
      }
    },
    [postTwoFactorVerify, update, router]
  )

  return { onAction }
}
