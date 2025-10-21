'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type AddProcessingUnitMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddProcessingUnitMenuContext = createContext<
  AddProcessingUnitMenuContextType | undefined
>(undefined)

export const AddProcessingUnitMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <AddProcessingUnitMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </AddProcessingUnitMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(AddProcessingUnitMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
