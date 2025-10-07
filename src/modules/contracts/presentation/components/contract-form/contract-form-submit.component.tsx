'use client'

import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface ContractFormSubmitComponentProps {
  onSubmit: (contract: ContractEntity) => void
}

export function ContractFormSubmitComponent({
  onSubmit
}: ContractFormSubmitComponentProps) {
  const { handleSubmit } = useFormContext()

  return (
    <Button
      className="w-full sm:w-[150px]"
      variant="primary"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
