import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Input } from '../shadcn/input'
import { Button } from '../shadcn/button'
import { cn } from '../../lib/utils'
import { forwardRef, useState, useCallback, type ComponentProps } from 'react'

export const InputPassword = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>(({ className, value, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prevState) => !prevState)
  }, [])

  const cleanedProps = {
    ...props,
    ...(value !== undefined ? { defaultValue: undefined } : {})
  }

  const isInputEmpty = !value

  return (
    <div className="relative !m-0">
      <Input
        ref={ref}
        type={isPasswordVisible ? 'text' : 'password'}
        className={cn('hide-password-toggle pr-10', className)}
        value={value}
        {...cleanedProps}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        disabled={isInputEmpty}
      >
        {isPasswordVisible ? (
          <EyeIcon
            className="h-4 w-4 text-zinc-950 dark:text-zinc-50"
            aria-hidden="true"
          />
        ) : (
          <EyeOffIcon
            className="h-4 w-4 text-zinc-950 dark:text-zinc-50"
            aria-hidden="true"
          />
        )}
      </Button>
    </div>
  )
})

InputPassword.displayName = 'InputPassword'
