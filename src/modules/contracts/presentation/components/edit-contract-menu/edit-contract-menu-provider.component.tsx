'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type EditContractMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const EditContractMenuContext = createContext<
  EditContractMenuContextType | undefined
>(undefined)

export const EditContractMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <EditContractMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </EditContractMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(EditContractMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
