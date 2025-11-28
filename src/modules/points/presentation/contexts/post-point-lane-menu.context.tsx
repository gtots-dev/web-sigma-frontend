'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchPointMenu,
  type UsePatchPointMenuReturn
} from '../hooks/use-patch-point-menu.hook'

const PostPointLaneMenuContext = createContext<
  UsePatchPointMenuReturn | undefined
>(undefined)

export const PostPointLaneMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchPointMenu()
  return (
    <PostPointLaneMenuContext.Provider value={value}>
      {children}
    </PostPointLaneMenuContext.Provider>
  )
}

export const usePostPointLaneMenuContext = () => {
  const context = useContext(PostPointLaneMenuContext)
  if (!context) {
    throw new Error(
      'usePostPointLaneMenuContext must be used within a PostPointLaneMenuProvider'
    )
  }
  return context
}
