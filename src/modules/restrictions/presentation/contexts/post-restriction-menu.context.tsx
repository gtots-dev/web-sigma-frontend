'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface PostRestrictionMenuContextData {
  isOpen: boolean
  open: () => void
  close: () => void
}

const PostRestrictionMenuContext = createContext<PostRestrictionMenuContextData | null>(null)

export function PostRestrictionMenuContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <PostRestrictionMenuContext.Provider value={{ isOpen, open, close }}>
      {children}
    </PostRestrictionMenuContext.Provider>
  )
}

export function usePostRestrictionMenuContext() {
  const context = useContext(PostRestrictionMenuContext)
  if (!context) {
    throw new Error('usePostRestrictionMenuContext must be used within PostRestrictionMenuContextProvider')
  }
  return context
}
