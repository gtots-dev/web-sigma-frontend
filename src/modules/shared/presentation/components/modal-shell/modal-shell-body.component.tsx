'use client'

import type { ReactNode } from 'react'

export interface ModalShellBodyProps {
  when?: boolean
  children?: ReactNode
}

export function ModalShellBody({
  when = true,
  children
}: ModalShellBodyProps) {
  if (!when) return null

  return <>{children}</>
}
