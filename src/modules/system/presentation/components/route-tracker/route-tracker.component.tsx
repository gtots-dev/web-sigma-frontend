'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function RouteTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname.includes('/modal')) {
      sessionStorage.setItem('last_visited_route', pathname)
    }
  }, [pathname])

  return null
}
