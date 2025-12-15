'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePontGroupLaneMenu,
  type UsePostGroupLaneMenuReturn
} from '../hooks/use-post-group-lane-menu.hook'

const PostGroupLaneMenuContext = createContext<
  UsePostGroupLaneMenuReturn | undefined
>(undefined)

export const PostGroupLaneMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePontGroupLaneMenu()
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
