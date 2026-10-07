import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import type { Item } from '../components/sidebar-system'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'

export function useSidebarSystemItem(item: Item) {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = useMemo(() => {
    const cleanPath = normalizePathname(pathname)
    return cleanPath === item.url
  }, [pathname, item.url])

  const handleClick = () => router.push(item.url)

  return { isActive, handleClick }
}
