'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ShieldAlert } from 'lucide-react'
import { usePostRestrictionMenuContext } from '../../contexts/post-restriction-menu.context'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'

export function PostRestrictionMenuTriggerComponent() {
  const { open } = usePostRestrictionMenuContext()

  return (
    <Button onClick={open} variant='primary' className="gap-2">
      <ShieldAlert className="h-4 w-4" />
      {MESSAGES_RESTRICTIONS['24.4']}
    </Button>
  )
}
