import type { ReactNode } from 'react'

interface CardOptionTitleComponentProps {
  children: ReactNode
}

export function CardOptionTitleComponent({ children }: CardOptionTitleComponentProps) {
  return <span className="text-lg font-medium">{children}</span>
}
