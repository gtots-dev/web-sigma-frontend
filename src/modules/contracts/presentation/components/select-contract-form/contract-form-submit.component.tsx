'use client'

import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { useToast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useContractStore } from '../../stores/contract.store'
import { useCallback } from 'react'

interface ContractFormSubmitComponentProps {
  close: VoidFunction
}

export function ContractFormSubmitComponent({
  close
}: ContractFormSubmitComponentProps) {
  const { setContract, contract: SelectContract } = useContractStore()
  const { toast } = useToast()
  const { handleSubmit } = useFormContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const replaceContractId = useCallback(
    (newContractId: string | number) => {
      const parts = pathname.split('/')
      const contractIndex = parts.findIndex((p) => p === 'contracts')
      if (contractIndex === -1) return

      parts[contractIndex + 1] = String(newContractId)

      const newPath =
        parts.join('/') +
        (searchParams.toString() ? `?${searchParams.toString()}` : '')

      router.replace(newPath)
    },
    [pathname, router, searchParams]
  )

  const onSubmit = ({ contract }: { contract: ContractEntity }) => {
    if (contract.id === SelectContract.id) {
      return toast({
        variant: 'destructive',
        title: 'Contrato já selecionado',
        description: `O contrato marcado já está selecionado. Escolha outra!`
      })
    }
    setContract(contract)
    replaceContractId(contract.id)
    close()
    toast({
      variant: 'success',
      title: 'Contrato selecionado',
      description: `Seu contrato selecionado foi alterada para ${contract.name}`
    })
  }

  return (
    <Button
      className="w-full sm:w-[150px] text-sm bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
      type="submit"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
