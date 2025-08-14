'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PutUserStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PutUserStatusMenuContext = createContext<
  PutUserStatusMenuContextType | undefined
>(undefined)

export const PutUserStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PutUserStatusMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </PutUserStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PutUserStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
