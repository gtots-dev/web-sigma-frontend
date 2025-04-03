import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { usePathname } from 'next/navigation'

export function useIsOperationDisabled() {
  const currentPathname = usePathname()
  const isCurrentPathOperation = currentPathname === PATHNAMES.OPERATIONS

  return { isCurrentPathOperation }
}
