'use client'

import { useParams, useRouter } from 'next/navigation'
import { UserRoundPlus } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function PostUserModalTriggerComponent() {
  const router = useRouter()
  const { operationId }: UrlParams = useParams()

  const handleOpen = () => {
    router.push(
      `/system/operations/${operationId}/configurations/users/modal/post`,
      { scroll: false }
    )
  }

  return (
    <Button variant="primary" className="w-full sm:w-auto" onClick={handleOpen}>
      <UserRoundPlus />
      <span className="truncate">Adicionar usuário</span>
    </Button>
  )
}
