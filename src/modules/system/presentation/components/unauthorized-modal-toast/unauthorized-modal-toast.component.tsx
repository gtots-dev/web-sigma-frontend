'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'

interface UnauthorizedModalToastProps {
  title?: string
  message?: string
}

export function UnauthorizedModalToast({
  title = 'Acesso negado',
  message = 'Você não possui permissão para acessar esta funcionalidade.'
}: UnauthorizedModalToastProps) {
  const router = useRouter()

  useEffect(() => {
    toast({
      variant: 'destructive',
      title,
      description: message
    })
    router.back()
  }, [title, message, router])

  return null
}
