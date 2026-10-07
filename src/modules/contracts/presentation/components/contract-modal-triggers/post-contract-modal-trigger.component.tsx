'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Plus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'

export function PostContractModalTriggerComponent() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Button
      onClick={() => router.push(`${pathname}/modal/post`)}
      className="bg-primary-600 hover:bg-primary-700 text-white font-medium"
    >
      <Plus className="mr-2 h-4 w-4" />
      {MESSAGES_CONTRACTS['3.4']}
    </Button>
  )
}
