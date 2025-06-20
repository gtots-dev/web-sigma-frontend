'use client'

import { type ComponentProps } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../shadcn/button'

export function ThemeToggle({ ...props }: ComponentProps<'button'>) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className="bg-transparent"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      {...props}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] hidden dark:block" />
      <Moon className="h-5 w-5 dark:hidden" />
    </Button>
  )
}
