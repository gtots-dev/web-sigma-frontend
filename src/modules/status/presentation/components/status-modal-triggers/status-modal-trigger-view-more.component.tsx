'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useTableStatus } from '../../contexts/table-status.context'

export function StatusModalTriggerViewMoreComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const status = useTableStatus()

  const modalPath =
    status.origin === 'UP'
      ? `${normalizePathname(pathname)}/modal/view-more-processing-unit/${status.id}`
      : `${normalizePathname(pathname)}/modal/view-more-lane/${status.id}`

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={() => router.push(modalPath)}
    >
      Ver Mais
    </Button>
  )
}
