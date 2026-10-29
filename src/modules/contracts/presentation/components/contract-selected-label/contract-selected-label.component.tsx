'use client'

import { useEffect, useCallback } from 'react'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import { useContractStore } from '../../stores/contract.store'
import { useActiveContractWorkspace } from '@/modules/system/presentation/hooks/use-active-contract-workspace.hook'
import { ContractOrganizationLogo } from '../contract-organization-logo'
import { useContractLogo } from '../../hooks/use-contract-logo.hook'

export function ContractSelectedLabelComponent() {
  const { contract, contracts, getContracts, setContract, loading } =
    useContractStore()
  const { operationId, activeContractId, hasActiveContract } =
    useActiveContractWorkspace()
  const { logoUrl } = useContractLogo()

  const loadSelectedContract = useCallback(async () => {
    if (!activeContractId || !operationId || !hasActiveContract) return

    if (!contracts?.length) {
      await getContracts({ operationId: String(operationId) })
      return
    }

    const selected = contracts.find((c) => c.id === Number(activeContractId))
    if (selected) setContract(selected)
  }, [
    activeContractId,
    operationId,
    hasActiveContract,
    contracts,
    getContracts,
    setContract
  ])

  useEffect(() => {
    if (
      hasActiveContract &&
      activeContractId &&
      contract?.id !== Number(activeContractId) &&
      !loading
    ) {
      loadSelectedContract()
    }
  }, [
    hasActiveContract,
    activeContractId,
    contract?.id,
    loading,
    loadSelectedContract
  ])

  if (!hasActiveContract || !activeContractId) return null

  const isContractReady =
    Boolean(contract?.name) && contract?.id === Number(activeContractId)
  const hasAlias =
    Boolean(contract?.alias) &&
    contract.alias.trim().toLowerCase() !== contract.name.trim().toLowerCase()

  return (
    <div className="order-2 sm:order-none h-full flex items-center justify-end w-auto max-w-full ms-auto gap-x-3 sm:gap-x-3.5 px-1 min-w-0 select-none">
      <div
        className="hidden min-[400px]:flex flex-col items-end justify-center min-w-0 max-w-[160px] sm:max-w-[240px] xl:max-w-[320px]"
        title={
          isContractReady
            ? [contract.name, hasAlias ? contract.alias : null]
                .filter(Boolean)
                .join(' — ')
            : undefined
        }
      >
        {isContractReady ? (
          <>
            <span className="max-w-full truncate text-[13px] font-semibold leading-5 text-zinc-900 dark:text-zinc-50">
              {contract.name}
            </span>
            {hasAlias && (
              <span className="max-w-full truncate text-xs leading-4 text-muted-foreground">
                {contract.alias}
              </span>
            )}
          </>
        ) : (
          <>
            <Skeleton className="w-[140px] h-[11px] rounded-full" />
            <Skeleton className="w-[90px] h-[9px] mt-1.5 rounded-full" />
          </>
        )}
      </div>

      {logoUrl && (
        <>
          <Separator
            orientation="vertical"
            className="hidden min-[400px]:block h-7 bg-border/80 shrink-0"
          />

          <ContractOrganizationLogo.Root
            url={logoUrl}
            contractName={isContractReady ? contract.name : undefined}
            contractAlias={isContractReady ? contract.alias : undefined}
            alt={
              isContractReady
                ? `Logotipo da organização responsável por ${contract.name}`
                : 'Logotipo da organização responsável pelo contrato'
            }
          />
        </>
      )}
    </div>
  )
}
