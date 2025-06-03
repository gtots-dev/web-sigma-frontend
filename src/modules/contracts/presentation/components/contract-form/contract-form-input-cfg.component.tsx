import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Textarea } from '@/modules/shared/presentation/components/shadcn/textarea'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

interface ContractFormInputCfgComponentProps {
  require?: boolean
  description?: string
}

export function ContractFormInputCfgComponent({
  require,
  description
}: ContractFormInputCfgComponentProps) {
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
      name="cfg"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
            htmlFor="name-contract"
          >
            CFG{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>
          <FormControl>
            <Textarea
              id="cfg-contract"
              autoComplete="off"
              className="!mt-1 dark:text-zinc-50 dark:border-zinc-800 focus:dark:border-zinc-50"
              placeholder="Adicione a configuração desejada."
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
