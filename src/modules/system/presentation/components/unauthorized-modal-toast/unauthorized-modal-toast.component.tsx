'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import {
  isModalRoute,
  normalizePathname
} from '@/modules/shared/infrastructure/configs/pathnames.config'

interface UnauthorizedModalToastProps {
  title?: string
  message?: string
}

export function UnauthorizedModalToast({
  title = 'Acesso negado',
  message = 'Você não possui permissão para acessar esta funcionalidade.'
}: UnauthorizedModalToastProps) {
  const router = useRouter()
  const pathname = usePathname()
  const hasFiredRef = useRef(false)

  useEffect(() => {
    if (hasFiredRef.current) return
    hasFiredRef.current = true

    toast({
      variant: 'destructive',
      title,
      description: message
    })

    if (isModalRoute(pathname)) {
      router.replace(normalizePathname(pathname))
    } else {
      router.back()
    }
  }, [title, message, router, pathname])

  return null
}
