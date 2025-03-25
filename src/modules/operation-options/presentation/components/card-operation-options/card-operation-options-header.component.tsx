import type { ReactNode } from 'react'

interface CardOperationOptionsHeaderComponentProps {
  children: ReactNode
}

export function CardOperationOptionsHeaderComponent({
  children
}: CardOperationOptionsHeaderComponentProps) {
  return <>{children}</>
}
