import type { ReactNode } from 'react'

export default function MonitoringLayout({
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
