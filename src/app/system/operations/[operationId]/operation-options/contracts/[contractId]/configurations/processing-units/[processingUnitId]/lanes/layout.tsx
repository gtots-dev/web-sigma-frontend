import type { ReactNode } from 'react'

export default function LanesLayout({
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
