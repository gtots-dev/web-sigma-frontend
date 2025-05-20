import { createContext, useContext, useState, ReactNode } from 'react'

type ViewMoreUserMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const ViewMoreUserMenuContext = createContext<
  ViewMoreUserMenuContextType | undefined
>(undefined)

export const ViewMoreUserMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <ViewMoreUserMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ViewMoreUserMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(ViewMoreUserMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
