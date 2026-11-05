'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MapPinPlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'

export function PostPointModalTriggerComponent() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={() => router.push(`${normalizePathname(pathname)}/modal/post`)}
    >
      <MapPinPlus />
      <span className="truncate">Adicionar Ponto</span>
    </Button>
  )
}
