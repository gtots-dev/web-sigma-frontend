'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  useViewMoreGroupMenu,
  type UseViewMoreGroupMenuReturn
} from '../hooks/use-view-more-group-menu.hook'

const ViewMoreGroupMenuContext = createContext<
  UseViewMoreGroupMenuReturn | undefined
>(undefined)

export const ViewMoreGroupMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = useViewMoreGroupMenu()
  return (
    <ViewMoreGroupMenuContext.Provider value={value}>
      {children}
    </ViewMoreGroupMenuContext.Provider>
  )
}

export const useViewMoreGroupMenuContext = () => {
  const context = useContext(ViewMoreGroupMenuContext)
  if (!context) {
    throw new Error(
      'useViewMoreGroupMenuContext must be used within a ViewMoreGroupMenuProvider'
    )
  }
  return context
}
