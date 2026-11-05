'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { Download } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { useUserById } from '../../hooks/use-user-by-id.hook'
import { useUserFilesStore } from '../../stores/user-files.store'
import { useUserFileDownload } from '../../hooks/use-file-download.hook'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface ViewMoreUserModalProps {
  title: string
  description: string
  userId: number
  onClose?: () => void
  onReturn?: () => void
}

function ViewMoreGroup({
  children,
  cols = 2
}: {
  children: ReactNode
  cols?: number
}) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}

function ViewMoreItem({
  children,
  title,
  notFoundData
}: {
  children: ReactNode
  title: string
  notFoundData: string
}) {
  const hasContent = Boolean(children)
  return (
    <div className="flex flex-col gap-y-1.5 min-h-12">
      <strong className="text-sm font-medium opacity-80">{title}:</strong>
      {hasContent ? (
        <div className="font-normal">{children}</div>
      ) : (
        <div className="font-normal opacity-70">{notFoundData}</div>
      )}
    </div>
  )
}

function ViewMoreFileItem({
  fileName,
  title,
  action
}: {
  fileName: string
  title: string
  action?: VoidFunction
}) {
  return (
    <section className="flex items-center justify-between w-full h-[60px] gap-4 rounded-md border border-input p-3.5">
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <h4 className="text-xs truncate">{title}:</h4>
        <span
          className="text-sm underline underline-offset-4 opacity-80 truncate"
          title={fileName}
        >
          {fileName}
        </span>
      </div>
      {action && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={action}
          aria-label={`Download ${fileName}`}
        >
          <Download className="w-4 h-4" />
        </Button>
      )}
    </section>
  )
}

export function ViewMoreUserModal({
  title,
  description,
  userId,
  onClose,
  onReturn
}: ViewMoreUserModalProps) {
  const { operationId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { user, loading: loadingUser } = useUserById(userId)
  const { files, getUserFiles } = useUserFilesStore()
  const { downloadFile } = useUserFileDownload()
  const [loadingFiles, setLoadingFiles] = useState(true)

  useEffect(() => {
    let active = true
    getUserFiles({ operationId, userId: String(userId) })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoadingFiles(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationId, userId])

  const loading = loadingUser || loadingFiles

  if (!loading && !user) {
    return (
      <ModalShell.Empty
        title="Usuário não encontrado"
        description={`O usuário solicitado com o ID ${userId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && user && (
        <>
          <ModalShell.Header title={title} description={description} />
          <ModalShell.Content>
            <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
              <ViewMoreGroup>
                <ViewMoreItem title="Nome" notFoundData="Sem Informação">
                  {user.name}
                </ViewMoreItem>
                <ViewMoreItem title="Email" notFoundData="Sem Informação">
                  {user.email}
                </ViewMoreItem>
                <ViewMoreItem title="Empresa" notFoundData="Sem Informação">
                  {user.company}
                </ViewMoreItem>
                <ViewMoreItem title="Posição" notFoundData="Sem Informação">
                  {user.position}
                </ViewMoreItem>
                <ViewMoreItem
                  title="Nome de usuário"
                  notFoundData="Sem Informação"
                >
                  {user.login_name}
                </ViewMoreItem>
                <ViewMoreItem title="Habilitado" notFoundData="Sem Informação">
                  {user.enabled ? 'Sim' : 'Não'}
                </ViewMoreItem>
              </ViewMoreGroup>
              <ViewMoreGroup cols={1}>
                <ViewMoreItem title="Descrição" notFoundData="Sem Informação">
                  {user.description}
                </ViewMoreItem>
              </ViewMoreGroup>
              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Arquivos anexados"
                  notFoundData="Sem Informação"
                >
                  {files.length > 0 && (
                    <ViewMoreGroup>
                      {files.map(
                        ({ id, original_name, user_id }: UserFileInterface) => (
                          <ViewMoreFileItem
                            key={id}
                            title="Nome"
                            fileName={original_name}
                            action={() =>
                              downloadFile({
                                userId: String(user_id),
                                fileId: String(id),
                                originalName: original_name
                              })
                            }
                          />
                        )
                      )}
                    </ViewMoreGroup>
                  )}
                </ViewMoreItem>
              </ViewMoreGroup>
            </main>
          </ModalShell.Content>
          <ModalShell.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              type="button"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </ModalShell.Footer>
        </>
      )}
    </ModalShell.Root>
  )
}
