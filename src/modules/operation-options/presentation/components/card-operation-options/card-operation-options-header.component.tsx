'use client'

import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { ReactNode, useEffect } from 'react'

interface CardOperationOptionsHeaderComponentProps {
  children: ReactNode
}

export function CardOperationOptionsHeaderComponent({
  children
}: CardOperationOptionsHeaderComponentProps) {
  const { fetchOperation } = useOperationStore()
  useEffect(()=> {
    fetchOperation()
  },[fetchOperation])
  
  return <>{children}</>
}
