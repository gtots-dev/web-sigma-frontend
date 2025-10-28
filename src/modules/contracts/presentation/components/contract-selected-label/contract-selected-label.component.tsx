'use client'

import { useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { FileText } from 'lucide-react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import { useContractStore } from '../../stores/contract.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export function ContractSelectedLabelComponent() {
  const { contract, contracts, getContracts, setContract } = useContractStore()
  const { contractId, operationId }: UrlParams = useParams()

  const loadSelectedContract = useCallback(async () => {
    if (!contractId) return
    if (!contracts?.length) await getContracts({ operationId })
    const selected = contracts.find((c) => c.id === Number(contractId))
    if (selected) setContract(selected)
  }, [contractId, contracts, getContracts, setContract])

  useEffect(() => {
    if (!contract.id) loadSelectedContract()
  }, [contract, loadSelectedContract])

  if (!contractId) return null

  return (
    <div className="h-full flex rounded-lg w-full gap-x-4 p-1.5 xl:w-[350px] select-none">
      <div className="flex flex-col items-start justify-center h-full w-full">
        {contract?.name ? (
          <span className="w-full text-end underline-offset-4 text-[13px] font-semibold">
            {contract.name}
          </span>
        ) : (
          <Skeleton className="w-[150px] h-[10px] mt-1.5 rounded-full" />
        )}

        {contract?.alias ? (
          <span className="w-full text-end text-[11.5px] font-medium text-zinc-950/90 dark:text-white/90">
            {contract.alias}
          </span>
        ) : (
          <Skeleton className="w-[100px] h-[10px] mt-1.5 rounded-full" />
        )}
      </div>

      <div className="grid place-content-center h-full aspect-square rounded-md bg-primary-600">
        <FileText className="h-4 w-4 text-white" />
      </div>
    </div>
  )
}
