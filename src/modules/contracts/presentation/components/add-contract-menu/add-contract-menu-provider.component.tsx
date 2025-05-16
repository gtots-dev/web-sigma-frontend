'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type AddContractMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddContractMenuContext = createContext<
  AddContractMenuContextType | undefined
>(undefined)

export const AddContractMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <AddContractMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </AddContractMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(AddContractMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
