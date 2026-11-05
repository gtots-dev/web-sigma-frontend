'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useTablePoint } from '../../contexts/table-point.context'

export function PatchPointStatusModalTriggerComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const { point } = useTablePoint()

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={() =>
        router.push(`${normalizePathname(pathname)}/modal/status/${point.id}`)
      }
    >
      Habilitar/Desabilitar
    </Button>
  )
}
