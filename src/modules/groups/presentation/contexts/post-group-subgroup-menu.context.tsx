'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePostGroupSubgroupMenu,
  type UsePostGroupSubgroupMenuReturn
} from '../hooks/use-post-group-subgroup-menu.hook'

const PostGroupSubgroupMenuContext = createContext<
  UsePostGroupSubgroupMenuReturn | undefined
>(undefined)

export const PostGroupSubgroupMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePostGroupSubgroupMenu()
  return (
    <PostGroupSubgroupMenuContext.Provider value={value}>
      {children}
    </PostGroupSubgroupMenuContext.Provider>
  )
}

export const usePostGroupSubgroupMenuContext = () => {
  const context = useContext(PostGroupSubgroupMenuContext)
  if (!context) {
    throw new Error(
      'usePostGroupSubgroupMenuContext must be used within a PostGroupSubgroupMenuProvider'
    )
  }
  return context
}
