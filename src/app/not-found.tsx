'use client'

import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const { replace } = useRouter()

  useEffect(() => {
    replace(PATHNAMES.AUTHENTICATION)
  }, [replace])

  return null
}
