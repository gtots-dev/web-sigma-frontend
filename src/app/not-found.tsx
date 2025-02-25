'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const { replace } = useRouter()

  useEffect(() => {
    const redirectPath = process.env.REDIRECT_ROUTER_DEFAULT || '/'
    replace(redirectPath)
  }, [replace])

  return null
}
