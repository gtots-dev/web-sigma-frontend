'use client'

import { useState } from 'react'

export const usePatchPointMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return { isOpen, open, close, toggle }
}

export type UsePatchPointMenuReturn = ReturnType<typeof usePatchPointMenu>
