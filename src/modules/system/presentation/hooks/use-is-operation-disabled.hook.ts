import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { usePathname } from 'next/navigation'

export function useIsOperationDisabled(): boolean {
  const currentPathname = usePathname()
  return currentPathname === PATHNAMES.OPERATIONS
}
