'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchGroupMenu,
  type UsePatchGroupMenuReturn
} from '../hooks/use-patch-group-menu.hook'

const PostGroupLaneMenuContext = createContext<
  UsePatchGroupMenuReturn | undefined
>(undefined)

export const PostGroupLaneMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchGroupMenu()
  return (
    <PostGroupLaneMenuContext.Provider value={value}>
      {children}
    </PostGroupLaneMenuContext.Provider>
  )
}

export const usePostGroupLaneMenuContext = () => {
  const context = useContext(PostGroupLaneMenuContext)
  if (!context) {
    throw new Error(
      'usePostGroupLaneMenuContext must be used within a PostGroupLaneMenuProvider'
    )
  }
  return context
}
