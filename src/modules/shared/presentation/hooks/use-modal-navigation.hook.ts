'use client'

import { useRouter, useParams } from 'next/navigation'
import { useCallback } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

export interface UseModalNavigationOptions {
  onClose?: () => void
  onReturn?: () => void
  fallbackPath?: string
}

export function useModalNavigation(options: UseModalNavigationOptions = {}) {
  const router = useRouter()
  const params = useParams() as UrlParams | null
  const operationId = params?.operationId

  const handleClose = useCallback(() => {
    if (options.onClose) {
      options.onClose()
      return
    }
    router.back()
  }, [options.onClose, router])

  const handleReturn = useCallback(() => {
    if (options.onReturn) {
      options.onReturn()
      return
    }
    const lastRoute =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('last_visited_route')
        : null
    const defaultFallback = operationId
      ? PATHNAMES.CONTRACTS(Number(operationId))
      : '/'
    router.replace(lastRoute ?? options.fallbackPath ?? defaultFallback)
  }, [options.onReturn, router, operationId, options.fallbackPath])

  return {
    handleClose,
    handleReturn
  }
}
