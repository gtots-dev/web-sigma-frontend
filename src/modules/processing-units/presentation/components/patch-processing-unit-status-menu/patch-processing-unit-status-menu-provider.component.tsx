'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PatchProcessingUnitsStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PatchProcessingUnitsStatusMenuContext = createContext<
  PatchProcessingUnitsStatusMenuContextType | undefined
>(undefined)

export const PatchProcessingUnitsStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PatchProcessingUnitsStatusMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PatchProcessingUnitsStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PatchProcessingUnitsStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
