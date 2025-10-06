'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ViewMoreActivityReportMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const ViewMoreActivityReportMenuContext = createContext<
  ViewMoreActivityReportMenuContextType | undefined
>(undefined)

export const ViewMoreActivityReportMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <ViewMoreActivityReportMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ViewMoreActivityReportMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(ViewMoreActivityReportMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
