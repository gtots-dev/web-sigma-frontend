'use client'

import type { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTrafficFlowForm } from '../../hooks/use-traffic-flow-form.hook'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'

interface TrafficFlowFormComponentProps {
  children: ReactNode
  initSettings: TrafficFlowFiltersInterface
}

export function TrafficFlowFormComponent({
  children,
  initSettings
}: TrafficFlowFormComponentProps) {
  const methods = useTrafficFlowForm(initSettings)
  return (
    <FormProvider {...methods}>
      <form autoComplete="off" className="w-full h-full">
        {children}
      </form>
    </FormProvider>
  )
}
