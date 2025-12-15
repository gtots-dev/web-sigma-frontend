'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchGroupStatusMenu,
  type UsePatchGroupStatusMenuReturn
} from '../hooks/use-patch-group-status-menu.hook'

const PatchGroupStatusMenuContext = createContext<
  UsePatchGroupStatusMenuReturn | undefined
>(undefined)

export const PatchGroupStatusMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchGroupStatusMenu()
  return (
    <PatchGroupStatusMenuContext.Provider value={value}>
      {children}
    </PatchGroupStatusMenuContext.Provider>
  )
}

export const usePatchGroupStatusMenuContext = () => {
  const context = useContext(PatchGroupStatusMenuContext)
  if (!context) {
    throw new Error(
      'usePatchGroupStatusMenuContext must be used within a PatchGroupStatusMenuProvider'
    )
  }
  return context
}
