import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { InputPassword } from '@/modules/shared/presentation/components/input-password/input-password.component'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useFormContext } from 'react-hook-form'

interface PasswordResetFormInputPasswordConfirmComponentProps {
  require?: boolean
  description?: string
}

export function PasswordResetFormInputPasswordConfirmComponent({
  require,
  description
}: PasswordResetFormInputPasswordConfirmComponentProps) {
  const { control } = useFormContext()
  return (
    <FormField
      name="passwordConfirm"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="password-confirm-user"
          >
            Confirmar Senha{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <InputPassword
              className="text-zinc-950 focus:dark:border-zinc-50 dark:text-zinc-50 dark:border-zinc-800 !mt-1
              autofill:dark:border-zinc-800 autofill::dark:shadow-none"
              id="password-confirm-user"
              name="password-confirm-user"
              defaultValue=""
              autoComplete="off"
              placeholder="Confirme sua senha aqui"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
