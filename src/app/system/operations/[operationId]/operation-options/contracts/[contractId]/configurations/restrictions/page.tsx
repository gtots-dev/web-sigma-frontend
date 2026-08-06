import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'
import { TableRestrictions } from '@/modules/restrictions/presentation/components/table-restrictions'
import { RestrictionsOptionsDropdownClient } from '@/modules/restrictions/presentation/components/restrictions-options-dropdown/restrictions-options-dropdown-client.component'
import { PostRestrictionMenuContextProvider } from '@/modules/restrictions/presentation/contexts/post-restriction-menu.context'
import { PostRestrictionMenuTriggerComponent } from '@/modules/restrictions/presentation/components/post-restriction-menu/post-restriction-menu-trigger.component'
import { PostRestrictionMenuComponent } from '@/modules/restrictions/presentation/components/post-restriction-menu/post-restriction-menu.component'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { auth } from '@/auth'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface RestrictionsPageProps {
  params: Promise<UrlParams>
}

export default async function RestrictionsPage({ params }: RestrictionsPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations`

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button
          className="mb-5 lg:mb-0"
          href={previousSection}
        />
        <Separator orientation="vertical" className="h-5 hidden lg:block" />
        <HeaderSection.Title>{MESSAGES_RESTRICTIONS['24.1']}</HeaderSection.Title>
        <HeaderSection.Description>
          {MESSAGES_RESTRICTIONS['24.2']}
        </HeaderSection.Description>
      </HeaderSection.Root>

      {(isAdmin || userPermissions.has(PermissionEnum.RESTRICTIONS_EDIT)) && (
        <ActionSection.Root>
          <PostRestrictionMenuContextProvider>
            <PostRestrictionMenuTriggerComponent />
            <PostRestrictionMenuComponent
              title={MESSAGES_RESTRICTIONS['24.4']}
              description={MESSAGES_RESTRICTIONS['24.5']}
            />
          </PostRestrictionMenuContextProvider>
        </ActionSection.Root>
      )}

      <TableRestrictions.Root>
        <TableRestrictions.Header />
        <TableRestrictions.Body>
          <TableRestrictions.Item>
            <RestrictionsOptionsDropdownClient
              isAdmin={isAdmin}
              permissions={userPermissions}
              patchTitle={MESSAGES_RESTRICTIONS['24.10']}
              patchDescription={MESSAGES_RESTRICTIONS['24.11']}
            />
          </TableRestrictions.Item>
        </TableRestrictions.Body>
      </TableRestrictions.Root>
    </main>
  )
}
