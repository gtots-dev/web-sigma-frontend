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
  const { onClose, onReturn, fallbackPath } = options
  const router = useRouter()
  const params = useParams() as UrlParams | null
  const operationId = params?.operationId

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
      return
    }
    router.back()
  }, [onClose, router])

  const handleReturn = useCallback(() => {
    if (onReturn) {
      onReturn()
      return
    }
    const lastRoute =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('last_visited_route')
        : null
    const defaultFallback = operationId
      ? PATHNAMES.CONTRACTS(Number(operationId))
      : '/'
    router.replace(lastRoute ?? fallbackPath ?? defaultFallback)
  }, [onReturn, router, operationId, fallbackPath])

  return {
    handleClose,
    handleReturn
  }
}
