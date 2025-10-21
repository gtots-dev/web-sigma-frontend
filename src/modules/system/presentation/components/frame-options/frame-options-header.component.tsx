import { ReactNode } from 'react'

interface FrameOptionsHeaderComponentProps {
  children: ReactNode
}

export function FrameOptionsHeaderComponent({
  children
}: FrameOptionsHeaderComponentProps) {
  return <>{children}</>
}
