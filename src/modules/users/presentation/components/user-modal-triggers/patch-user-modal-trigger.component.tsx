'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useTableUser } from '../../contexts/table-user.context'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function PatchUserModalTriggerComponent() {
  const router = useRouter()
  const { operationId }: UrlParams = useParams()
  const { id: userId } = useTableUser()

  const handleOpen = () => {
    router.push(
      `/system/operations/${operationId}/configurations/users/modal/patch/${userId}`,
      { scroll: false }
    )
  }

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={handleOpen}
    >
      Editar
    </Button>
  )
}
