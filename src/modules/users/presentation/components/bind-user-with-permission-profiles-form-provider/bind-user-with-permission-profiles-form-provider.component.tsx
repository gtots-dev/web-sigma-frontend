'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  BindUserWithPermissionProfileFormSchema,
  type BindUserWithPermissionProfileFormType
} from '../../schemas/bind-user-with-permission-profiles-form.schema'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'

interface BindUserWithPermissionProfileFormContextProviderComponentProps {
  children: ReactNode
  permissionProfiles: PermissionProfileWithUserInterface[]
  userPermissionProfileContract: UserPermissionProfileContractInterface[]
  userId: UserEntity['id']
  isOpen: boolean
}

export function BindUserWithPermissionProfileFormContextProviderComponent({
  permissionProfiles,
  userPermissionProfileContract,
  children,
  userId,
  isOpen
}: BindUserWithPermissionProfileFormContextProviderComponentProps) {
  const defaultValues = useMemo<BindUserWithPermissionProfileFormType>(() => {
    return {
      user_id: userId,
      perm_profile_id:
        permissionProfiles?.map(({ perm_profile_id }) => perm_profile_id) ?? [],
      profiles:
        permissionProfiles?.map(({ perm_profile_id, id }) => {
          const contract_ids =
            userPermissionProfileContract
              .filter(({ user_perm_profile_id }) => user_perm_profile_id === id)
              .map(({ contract_id }) => contract_id) ?? []
          return {
            perm_profile_id,
            contract_ids: contract_ids.length > 0 ? contract_ids : []
          }
        }) ?? []
    }
  }, [userId, permissionProfiles, userPermissionProfileContract])

  const methods = useForm<BindUserWithPermissionProfileFormType>({
    resolver: zodResolver(BindUserWithPermissionProfileFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
