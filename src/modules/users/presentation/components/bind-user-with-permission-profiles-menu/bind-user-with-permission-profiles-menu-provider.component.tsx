import { createContext, useContext, useState, ReactNode } from 'react'

type BindUserWithPermissionProfilesMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const BindUserWithPermissionProfilesMenuContext = createContext<
  BindUserWithPermissionProfilesMenuContextType | undefined
>(undefined)

export const BindUserWithPermissionProfilesMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <BindUserWithPermissionProfilesMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </BindUserWithPermissionProfilesMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(BindUserWithPermissionProfilesMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
