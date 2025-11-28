'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchPointStatusMenu,
  type UsePatchPointStatusMenuReturn
} from '../hooks/use-patch-point-status-menu.hook'

const PatchPointStatusMenuContext = createContext<
  UsePatchPointStatusMenuReturn | undefined
>(undefined)

export const PatchPointStatusMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchPointStatusMenu()
  return (
    <PatchPointStatusMenuContext.Provider value={value}>
      {children}
    </PatchPointStatusMenuContext.Provider>
  )
}

export const usePatchPointStatusMenuContext = () => {
  const context = useContext(PatchPointStatusMenuContext)
  if (!context) {
    throw new Error(
      'usePatchPointStatusMenuContext must be used within a PatchPointStatusMenuProvider'
    )
  }
  return context
}
