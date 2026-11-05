import type { ReactNode } from 'react'

export default function ProcessingUnitsLayout({
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
