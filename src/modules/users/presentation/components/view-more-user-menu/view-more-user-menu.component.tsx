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

        <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
          <ViewMoreUserMenu.Group>
            <ViewMoreUserMenu.Item.data
              title="Nome"
              notFoundData="Sem Informação"
            >
              {name}
            </ViewMoreUserMenu.Item.data>
            <ViewMoreUserMenu.Item.data
              title="Email"
              notFoundData="Sem Informação"
            >
              {email}
            </ViewMoreUserMenu.Item.data>
            <ViewMoreUserMenu.Item.data
              title="Empresa"
              notFoundData="Sem Informação"
            >
              {company}
            </ViewMoreUserMenu.Item.data>
            <ViewMoreUserMenu.Item.data
              title="Posição"
              notFoundData="Sem Informação"
            >
              {position}
            </ViewMoreUserMenu.Item.data>
            <ViewMoreUserMenu.Item.data
              title="Nome de usuário"
              notFoundData="Sem Informação"
            >
              {login_name}
            </ViewMoreUserMenu.Item.data>
            <ViewMoreUserMenu.Item.data
              title="Habilitado"
              notFoundData="Sem Informação"
            >
              {enabled ? 'Sim' : 'Não'}
            </ViewMoreUserMenu.Item.data>
          </ViewMoreUserMenu.Group>
          <ViewMoreUserMenu.Group cols={1}>
            <ViewMoreUserMenu.Item.data
              title="Descrição"
              notFoundData="Sem Informação"
            >
              {userDescription}
            </ViewMoreUserMenu.Item.data>
          </ViewMoreUserMenu.Group>
          <ViewMoreUserMenu.Group cols={1}>
            <ViewMoreUserMenu.Item.data
              title="Arquivos anexados"
              notFoundData="Sem Informação"
            >
              <ViewMoreUserMenu.Group>
                <ViewMoreUserMenu.Item.file
                  title="Nome"
                  fileName="simple.pdf"
                />
              </ViewMoreUserMenu.Group>
            </ViewMoreUserMenu.Item.data>
          </ViewMoreUserMenu.Group>
        </main>

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
