'use client'

import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useSmartFormSubmit } from '@/modules/shared/presentation/hooks/use-smart-form-submit.hook'

interface ContractFormSubmitComponentProps {
  onSubmit: (contract: ContractEntity | Partial<ContractEntity>) => void
}

export function ContractFormSubmitComponent({
  onSubmit
}: ContractFormSubmitComponentProps) {
  const handleSmartSubmit = useSmartFormSubmit<ContractEntity>(onSubmit)

  return (
    <Button
      className="w-full sm:w-[150px]"
      variant="primary"
      onClick={handleSmartSubmit}
    >
      Confirmar
    </Button>
  )
}
