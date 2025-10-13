'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PutContractStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PutContractStatusMenuContext = createContext<
  PutContractStatusMenuContextType | undefined
>(undefined)

export const PutContractStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PutContractStatusMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PutContractStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PutContractStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
