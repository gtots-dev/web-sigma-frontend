'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ViewMoreUserMenu } from '.'
import { useDialog } from './view-more-user-menu-provider.component'
import { useTableUser } from '../../contexts/table-user.context'

interface ViewMoreUserMenuComponentProps {
  title: string
  description: string
}

export function ViewMoreUserMenuComponent({
  title,
  description
}: ViewMoreUserMenuComponentProps) {
  const { close } = useDialog()
  const {
    name,
    email,
    company,
    position,
    login_name,
    enabled,
    description: userDescription
  } = useTableUser()
  return (
    <ViewMoreUserMenu.Root>
      <ViewMoreUserMenu.Content>
        <ViewMoreUserMenu.Header title={title} description={description} />
        <div className="h-full w-full p-8">
          <div className="flex flex-col gap-7">
            <ViewMoreUserMenu.Group>
              <ViewMoreUserMenu.Item title="Nome" notFoundData="Sem Informação">
                {name}
              </ViewMoreUserMenu.Item>
              <ViewMoreUserMenu.Item
                title="Email"
                notFoundData="Sem Informação"
              >
                {email}
              </ViewMoreUserMenu.Item>
              <ViewMoreUserMenu.Item
                title="Empresa"
                notFoundData="Sem Informação"
              >
                {company}
              </ViewMoreUserMenu.Item>
              <ViewMoreUserMenu.Item
                title="Posição"
                notFoundData="Sem Informação"
              >
                {position}
              </ViewMoreUserMenu.Item>
              <ViewMoreUserMenu.Item
                title="Nome de usuário"
                notFoundData="Sem Informação"
              >
                {login_name}
              </ViewMoreUserMenu.Item>
              <ViewMoreUserMenu.Item
                title="Habilitado"
                notFoundData="Sem Informação"
              >
                {enabled ? 'Sim' : 'Não'}
              </ViewMoreUserMenu.Item>
            </ViewMoreUserMenu.Group>
            <ViewMoreUserMenu.Group cols={1}>
              <ViewMoreUserMenu.Item
                title="Descrição"
                notFoundData="Sem Informação"
              >
                {userDescription}
              </ViewMoreUserMenu.Item>
            </ViewMoreUserMenu.Group>
          </div>
        </div>
        <ViewMoreUserMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Fechar
          </Button>
        </ViewMoreUserMenu.Footer>
      </ViewMoreUserMenu.Content>
    </ViewMoreUserMenu.Root>
  )
}
