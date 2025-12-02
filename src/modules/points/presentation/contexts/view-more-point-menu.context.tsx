'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  useViewMorePointMenu,
  type UseViewMorePointMenuReturn
} from '../hooks/use-view-more-point-menu.hook'

const ViewMorePointMenuContext = createContext<
  UseViewMorePointMenuReturn | undefined
>(undefined)

export const ViewMorePointMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = useViewMorePointMenu()
  return (
    <ViewMorePointMenuContext.Provider value={value}>
      {children}
    </ViewMorePointMenuContext.Provider>
  )
}

export const useViewMorePointMenuContext = () => {
  const context = useContext(ViewMorePointMenuContext)
  if (!context) {
    throw new Error(
      'useViewMorePointMenuContext must be used within a ViewMorePointMenuProvider'
    )
  }
  return context
}
