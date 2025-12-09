'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchGroupMenu,
  type UsePatchGroupMenuReturn
} from '../hooks/use-patch-group-menu.hook'

const PatchGroupMenuContext = createContext<UsePatchGroupMenuReturn | undefined>(
  undefined
)

export const PatchGroupMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchGroupMenu()
  return (
    <PatchGroupMenuContext.Provider value={value}>
      {children}
    </PatchGroupMenuContext.Provider>
  )
}

export const usePatchGroupMenuContext = () => {
  const context = useContext(PatchGroupMenuContext)
  if (!context) {
    throw new Error(
      'usePatchGroupMenuContext must be used within a PatchGroupMenuProvider'
    )
  }
  return context
}
