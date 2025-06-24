import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { TablePermissionProfiles } from '@/modules/permissions/presentation/components/table-permission-profiles'

interface Data {
  title: string
  description: string
}

export default function PermissionsPage() {
  const data: Data = {
    title: MESSAGES_PERMISSIONS['6.1'],
    description: MESSAGES_PERMISSIONS['6.2']
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 sm:pb-0 gap-5">
      <HeaderSection.Root>
        <HeaderSection.Title>{data.title}</HeaderSection.Title>
        <HeaderSection.Description>
          {data.description}
        </HeaderSection.Description>
      </HeaderSection.Root>
      <Separator orientation="horizontal" />
      <TablePermissionProfiles.Root>
        <TablePermissionProfiles.Header />
        <TablePermissionProfiles.Body>
          <TablePermissionProfiles.Item>...</TablePermissionProfiles.Item>
        </TablePermissionProfiles.Body>
      </TablePermissionProfiles.Root>
    </main>
  )
}
