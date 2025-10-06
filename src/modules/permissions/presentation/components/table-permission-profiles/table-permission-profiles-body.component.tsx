'use client'

import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { TablePermissionProfilesContext } from '../../contexts/table-permission-profiles.context'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { useTablePermissionProfiles } from '../../hooks/use-table-permission-profiles.hook'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

export function TablePermissionProfilesBodyComponent({
  children
}: {
  children: React.ReactNode
}) {
  const { permissionProfiles, loading } = useTablePermissionProfiles()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={4} />
      </TableBody>
    )

  if (permissionProfiles.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={4} message={MESSAGES_PERMISSIONS['6.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {permissionProfiles.map(
        (
          permissionProfile: PermissionProfileInterface &
            PermissionProfileEnableAndDisableInterface
        ) => (
          <TablePermissionProfilesContext.Provider
            key={permissionProfile.id}
            value={permissionProfile}
          >
            {children}
          </TablePermissionProfilesContext.Provider>
        )
      )}
    </TableBody>
  )
}
