'use client'

import type { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { useInfractionsFiltersForm } from '@/modules/infractions/presentation/hooks/use-infractions-filters-form.hook'
import type { InfractionsFiltersInterface } from '@/modules/infractions/domain/interfaces/infractions-filters.interface'

interface InfractionsFormComponentProps {
  children: ReactNode
  initFilters?: InfractionsFiltersInterface
}

export function InfractionsFormComponent({
  children,
  initFilters
}: InfractionsFormComponentProps) {
  const methods = useInfractionsFiltersForm(initFilters)

  return <FormProvider {...methods}>{children}</FormProvider>
}
