'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePathname, useRouter } from 'next/navigation'
import { useTableContract } from '../../contexts/table-contract.context'

export function PutContractStatusModalTriggerComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const contract = useTableContract()

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={() => router.push(`${pathname}/modal/status/put/${contract.id}`)}
    >
      Habilitar/Desabilitar
    </Button>
  )
}
