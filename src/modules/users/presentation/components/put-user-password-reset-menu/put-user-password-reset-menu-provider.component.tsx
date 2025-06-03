import { createContext, useContext, useState, ReactNode } from 'react'

type PutUserPasswordResetMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PutUserPasswordResetMenuContext = createContext<
  PutUserPasswordResetMenuContextType | undefined
>(undefined)

export const PutUserPasswordResetMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PutUserPasswordResetMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </PutUserPasswordResetMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PutUserPasswordResetMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
