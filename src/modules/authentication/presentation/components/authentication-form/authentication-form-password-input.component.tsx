'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/modules/shared/presentation/components/shadcn/form'
import { InputPassword } from '@/modules/shared/presentation/components/input-password/input-password.component'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import type { ReactNode } from 'react'

interface AuthenticationFormInputPasswordComponentProps {
  description?: string
  children: ReactNode
}

export function AuthenticationFormInputPasswordComponent({
  description,
  children
}: AuthenticationFormInputPasswordComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      name="password"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="password"
          >
            Senha:
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <InputPassword
              className="text-zinc-950 focus:dark:border-zinc-50 dark:text-zinc-50 dark:border-zinc-800 !mt-1
              autofill:dark:border-zinc-800 autofill::dark:shadow-none"
              id="password"
              placeholder="Digite sua senha aqui"
              {...field}
            />
          </FormControl>

          <FormMessage />

          <FormDescription className="flex justify-end">
            {children}
          </FormDescription>
        </FormItem>
      )}
    />
  )
}
