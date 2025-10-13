import { type ChangeEvent } from 'react'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { useFormContext } from 'react-hook-form'

interface UserFormInputPasswordDeadlineComponentProps {
  require?: boolean
  description?: string
}

export function UserFormInputPasswordDeadlineComponent({
  require,
  description
}: UserFormInputPasswordDeadlineComponentProps) {
  const { control } = useFormContext()

  return (
    <FormField
      name="days_passwd_reg_deadline"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="password-deadline-user"
          >
            Tempo de expiração de senha (Dias){require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              id="password-deadline-user"
              autoComplete="off"
              className="!mt-1 dark:text-zinc-50 dark:border-zinc-800 focus:dark:border-zinc-50"
              {...field}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.valueAsNumber
                field.onChange(Number.isNaN(value) ? undefined : value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
