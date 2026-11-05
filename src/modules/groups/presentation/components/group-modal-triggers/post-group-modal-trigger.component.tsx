'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MapPlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'

export function PostGroupModalTriggerComponent() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={() => router.push(`${normalizePathname(pathname)}/modal/post`)}
    >
      <MapPlus />
      <span className="truncate">Adicionar Grupo</span>
    </Button>
  )
}
