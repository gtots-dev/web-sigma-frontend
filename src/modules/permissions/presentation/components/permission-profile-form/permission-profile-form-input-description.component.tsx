import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Textarea } from '@/modules/shared/presentation/components/shadcn/textarea'
import { useFormContext } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'

interface PermissionProfileFormInputDescriptionComponentProps {
  require?: boolean
  description?: string
}

export function PermissionProfileFormInputDescriptionComponent({
  require,
  description
}: PermissionProfileFormInputDescriptionComponentProps) {
  const { control } = useFormContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResize = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }

  useEffect(() => {
    autoResize()
  }, [])

  return (
    <FormField
      name="description"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="description-permission-profile"
          >
            Descrição{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <Textarea
              id="description-permission-profile"
              autoComplete="off"
              className="!mt-1 dark:text-zinc-50 dark:border-zinc-800 focus:dark:border-zinc-50"
              placeholder="Adicione uma descrição relatando suas ações ou observações."
              {...field}
              ref={(el) => {
                textareaRef.current = el
                field.ref(el)
              }}
              onInput={(e) => {
                field.onChange(e)
                autoResize()
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
