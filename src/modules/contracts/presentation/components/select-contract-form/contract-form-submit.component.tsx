'use client'

import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useToast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useContractStore } from '../../stores/contract.store'

interface ContractFormSubmitComponentProps {
  close: VoidFunction
}

export function ContractFormSubmitComponent({
  close
}: ContractFormSubmitComponentProps) {
  const { setContract, contract: SelectContract } = useContractStore()
  const { toast } = useToast()
  const { handleSubmit } = useFormContext()
  const { replace } = useRouter()

  const onSubmit = ({ contract }: { contract: ContractEntity }) => {
    if (contract.id === SelectContract.id) {
      return toast({
        variant: 'destructive',
        title: 'Contrato já selecionado',
        description: `O contrato marcado já está selecionado. Escolha outra!`
      })
    }
    setContract(contract)
    replace(
      PATHNAMES.CONTRACTS_OPTIONS(
        Number(contract.operation_id),
        Number(contract.id)
      )
    )
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
