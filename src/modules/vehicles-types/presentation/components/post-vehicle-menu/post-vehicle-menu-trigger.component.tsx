'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Car } from 'lucide-react'
import { usePostVehicleMenuTrigger } from '../../hooks/use-post-vehicle-menu-trigger.hook'

export function PostVehicleMenuTriggerComponent() {
  const { loadPostVehicleOpenDialog } = usePostVehicleMenuTrigger()
  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={loadPostVehicleOpenDialog}
    >
      <Car />
      <span className="truncate">Adicionar Tipo de Veículo</span>
    </Button>
  )
}
