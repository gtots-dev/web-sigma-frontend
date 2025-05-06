import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import type { Item } from '../components/sidebar-system'

export function useSidebarSystemItem(item: Item) {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = useMemo(() => pathname === item.url, [pathname, item.url])

  const handleClick = () => router.push(item.url)

  return { isActive, handleClick }
}
