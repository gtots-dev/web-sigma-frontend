'use client'

import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Users } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { useUserStore } from '@/modules/users/presentation/stores/user.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function ActivityReportUsersComponent() {
  const { control } = useFormContext<ActivityReportSchemaType>()
  const { users, getUsers } = useUserStore()
  const { operationId }: UrlParams = useParams()

  useEffect(() => {
    if (operationId && users.length === 0) {
      getUsers({ operationId })
    }
  }, [users.length, getUsers, operationId])

  const usersItems = useMemo(() => {
    return users.map((u) => ({
      id: u.id,
      label: u.name
    }))
  }, [users])

  return (
    <FormField
      control={control}
      name="user_ids"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={usersItems}
              value={field.value ?? []}
              leftIcon={Users}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Usuários"
              notFoundItemPlaceholder="Nenhum usuário encontrado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
