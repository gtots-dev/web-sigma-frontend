'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Plus } from 'lucide-react'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'
import { usePathname, useRouter } from 'next/navigation'
import { normalizePathname } from '@/modules/shared/infrastructure/configs/pathnames.config'

export function PostRestrictionModalTriggerComponent() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Button
      onClick={() => router.push(`${normalizePathname(pathname)}/modal/post`)}
      className="bg-primary-600 hover:bg-primary-700 text-white font-medium"
    >
      <Plus className="mr-2 h-4 w-4" />
      {MESSAGES_RESTRICTIONS['24.4']}
    </Button>
  )
}
