'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type EditProcessingUnitsMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const EditProcessingUnitsMenuContext = createContext<
  EditProcessingUnitsMenuContextType | undefined
>(undefined)

export const EditProcessingUnitsMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <EditProcessingUnitsMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </EditProcessingUnitsMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(EditProcessingUnitsMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
