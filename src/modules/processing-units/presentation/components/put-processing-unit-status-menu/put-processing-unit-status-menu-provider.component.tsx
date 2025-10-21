'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PutProcessingUnitsStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PutProcessingUnitsStatusMenuContext = createContext<
  PutProcessingUnitsStatusMenuContextType | undefined
>(undefined)

export const PutProcessingUnitsStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PutProcessingUnitsStatusMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PutProcessingUnitsStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PutProcessingUnitsStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
