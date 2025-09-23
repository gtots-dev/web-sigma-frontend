'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Check, ChevronsUpDown, Square } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { useUserStore } from '@/modules/users/presentation/stores/user.store'
import { cn } from '@/modules/shared/presentation/lib/utils'

interface ActivityReportUsersComponentProps {
  require?: boolean
  description?: string
}

export function ActivityReportUsersComponent({
  require,
  description
}: ActivityReportUsersComponentProps) {
  const { control } = useFormContext<ActivityReportSchemaType>()
  const { users, getUsers } = useUserStore()
  const [loading, setLoading] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = useState(0)

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [users, loading])

  useEffect(() => {
    if (users.length === 0) {
      setLoading(true)
      getUsers().finally(() => setLoading(false))
    }
  }, [users.length, getUsers])

  return (
    <FormField
      control={control}
      name="user_ids"
      render={({ field }) => {
        const selectedIds: number[] = field.value ?? []

        const toggleUser = (id: number) => {
          if (selectedIds.includes(id)) {
            field.onChange(selectedIds.filter((c) => c !== id))
          } else {
            field.onChange([...selectedIds, id])
          }
        }

        let buttonLabel = 'Selecione usuários'
        if (loading) {
          buttonLabel = 'Carregando...'
        } else if (selectedIds.length === 1) {
          const selectedUser = users.find((u) => u.id === selectedIds[0])
          buttonLabel = selectedUser?.name ?? 'Selecione usuários'
        } else if (selectedIds.length > 1) {
          buttonLabel = `${selectedIds.length} usuário(s) selecionado(s)`
        }

        return (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
              Usuários{require ? ': *' : ':'}
              <HelpMeButtonComponent description={description} />
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    ref={triggerRef}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between dark:text-zinc-50 dark:border-zinc-800',
                      selectedIds.length === 0 &&
                        !loading &&
                        'text-muted-foreground'
                    )}
                  >
                    {buttonLabel}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="overflow-y-auto p-1"
                  align="start"
                  sideOffset={4}
                  style={{ minWidth: triggerWidth }}
                >
                  {loading ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Carregando...
                    </div>
                  ) : users.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Nenhum usuário disponível
                    </div>
                  ) : (
                    users.map((user) => {
                      const selected = selectedIds.includes(user.id)
                      return (
                        <div
                          key={user.id}
                          className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent',
                            selected && 'bg-accent'
                          )}
                          onClick={() => toggleUser(user.id)}
                        >
                          {selected ? (
                            <Check className="h-4 w-4 opacity-100" />
                          ) : (
                            <Square
                              className="h-4 w-4"
                              strokeWidth={1}
                            />
                          )}
                          <span className="truncate">{user.name}</span>
                        </div>
                      )
                    })
                  )}
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
