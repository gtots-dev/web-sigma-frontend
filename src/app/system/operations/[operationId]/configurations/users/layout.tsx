import type { ReactNode } from 'react'

export default function UsersLayout({
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
