import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { TablePermissionProfiles } from '@/modules/permissions/presentation/components/table-permission-profiles'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { AddPermissionProfileMenu } from '@/modules/permissions/presentation/components/add-permission-profile-menu'
import { AddPermissionProfileMenuComponent } from '@/modules/permissions/presentation/components/add-permission-profile-menu/add-permission-profile-menu.component'
import { PermissionProfileOptionsDropdown } from '@/modules/permissions/presentation/components/permission-profile-options-dropdown'
import { EditPermissionProfileMenu } from '@/modules/permissions/presentation/components/edit-permission-profile-menu'
import { EditPermissionProfileMenuComponent } from '@/modules/permissions/presentation/components/edit-permission-profile-menu/edit-permission-profile-menu.component'

interface Data {
  title: string
  description: string
  menuAddPermissionProfileTitle: string
  menuAddPermissionProfileDescription: string
  menuEditPermissionProfileTitle: string
  menuEditPermissionProfileDescription: string
}

export default function PermissionsPage() {
  const data: Data = {
    title: MESSAGES_PERMISSIONS['6.1'],
    description: MESSAGES_PERMISSIONS['6.2'],
    menuAddPermissionProfileTitle: MESSAGES_PERMISSIONS['6.4'],
    menuAddPermissionProfileDescription: MESSAGES_PERMISSIONS['6.5'],
    menuEditPermissionProfileTitle: MESSAGES_PERMISSIONS['6.10'],
    menuEditPermissionProfileDescription: MESSAGES_PERMISSIONS['6.11']
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
      <ActionSection.Root>
        <AddPermissionProfileMenu.Provider>
          <AddPermissionProfileMenu.Trigger />
          <AddPermissionProfileMenuComponent
            title={data.menuAddPermissionProfileTitle}
            description={data.menuAddPermissionProfileDescription}
          />
        </AddPermissionProfileMenu.Provider>
      </ActionSection.Root>
      <TablePermissionProfiles.Root>
        <TablePermissionProfiles.Header />
        <TablePermissionProfiles.Body>
          <TablePermissionProfiles.Item>
            <EditPermissionProfileMenu.Provider>
              <PermissionProfileOptionsDropdown.Root>
                <PermissionProfileOptionsDropdown.Trigger />
                <PermissionProfileOptionsDropdown.Menu>
                  <PermissionProfileOptionsDropdown.Item>
                    <EditPermissionProfileMenu.Trigger />
                  </PermissionProfileOptionsDropdown.Item>
                </PermissionProfileOptionsDropdown.Menu>
              </PermissionProfileOptionsDropdown.Root>
              <EditPermissionProfileMenuComponent
                title={data.menuEditPermissionProfileTitle}
                description={data.menuEditPermissionProfileDescription}
              />
            </EditPermissionProfileMenu.Provider>
          </TablePermissionProfiles.Item>
        </TablePermissionProfiles.Body>
      </TablePermissionProfiles.Root>
    </main>
  )
}
