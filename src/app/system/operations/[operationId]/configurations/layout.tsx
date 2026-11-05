import type { ReactNode } from 'react'

export default function OperationConfigurationsLayout({
  children,
  modal
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
