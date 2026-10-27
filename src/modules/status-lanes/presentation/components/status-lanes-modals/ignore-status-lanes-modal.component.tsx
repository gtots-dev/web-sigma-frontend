'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'
import { IgnoreStatusLanesForm } from '../ignore-status-lanes-form'
import { useIgnoreStatusLanesForm } from '../../hooks/use-ignore-status-lanes-form.hook'
import { useStatusLaneById } from '../../hooks/use-status-lane-by-id.hook'
import { useLanesOptions } from '../../hooks/use-lanes-options.hook'
import {
  useStatusLaneIgnores,
  type LaneIgnoreInfo
} from '../../hooks/use-status-lane-ignores.hook'
import { usePostStatusLanesSubmit } from '../../hooks/use-post-status-lanes-submit.hook'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'
import type { IgnoreStatusLanesFormType } from '../../schemas/ignore-status-lanes-form.schema'

export interface IgnoreStatusLanesModalProps {
  title: string
  description: string
  statusId: number
  hasPermission?: boolean
  onClose?: () => void
  onReturn?: () => void
}

interface IgnoreStatusLanesFormBodyProps {
  title: string
  description: string
  status: LaneStatusInterface
  contractLanes: LaneWithPointAndGroupInterface[]
  initialLaneIds: number[]
  ignoreMap: Map<number, LaneIgnoreInfo>
  hasPermission?: boolean
  onClose: () => void
}

function IgnoreStatusLanesFormBody({
  title,
  description,
  status,
  contractLanes,
  initialLaneIds,
  ignoreMap,
  hasPermission = true,
  onClose
}: IgnoreStatusLanesFormBodyProps) {
  const { methods } = useIgnoreStatusLanesForm(initialLaneIds)
  const { onAction, submitting } = usePostStatusLanesSubmit()

  const handleSubmit = async (data: IgnoreStatusLanesFormType) => {
    await onAction({
      statusId: status.id,
      statusCode: status.code,
      contractLanes,
      initialLaneIds,
      ignoreMap,
      selectedLaneIds: data.laneIds,
      onSuccess: onClose
    })
  }

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <IgnoreStatusLanesForm.Form
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-1 rounded-md border bg-muted/40 px-4 py-3 shrink-0">
            <span className="text-xs text-zinc-500">Status selecionado</span>
            <span
              title={status.description}
              className="text-sm font-medium truncate"
            >
              {status.description}
            </span>
          </div>

          <IgnoreStatusLanesForm.Input.Lanes hasPermission={hasPermission} />
        </IgnoreStatusLanesForm.Form>
      </ModalShell.Content>
      <ModalShell.Footer>
        <Button
          className="w-full sm:w-[150px]"
          variant="outline"
          type="button"
          disabled={submitting}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          className="w-full sm:w-[150px]"
          variant="primary"
          disabled={submitting || !hasPermission}
          onClick={methods.handleSubmit(handleSubmit)}
        >
          Confirmar <LoadingSpinComponent loading={submitting} />
        </Button>
      </ModalShell.Footer>
    </FormProvider>
  )
}

export function IgnoreStatusLanesModal({
  title,
  description,
  statusId,
  hasPermission = true,
  onClose,
  onReturn
}: IgnoreStatusLanesModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const {
    status,
    loading: loadingStatus,
    error: statusError
  } = useStatusLaneById(statusId)
  const {
    contractLanes,
    loading: loadingLanes,
    error: lanesError
  } = useLanesOptions(hasPermission)
  const {
    initialLaneIds,
    ignoreMap,
    loading: loadingIgnores
  } = useStatusLaneIgnores(statusId, contractLanes)

  const loading = loadingStatus || loadingLanes || loadingIgnores
  const effectiveHasPermission = hasPermission && lanesError?.status !== 403

  if (statusError?.status === 403) {
    return <UnauthorizedModalToast message={statusError.message} />
  }

  if (!loading && !status) {
    return (
      <ModalShell.Empty
        title={MESSAGES_STATUS_LANES['26.9']}
        description={`O status solicitado com o ID ${statusId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && status && (
        <IgnoreStatusLanesFormBody
          title={title}
          description={description}
          status={status}
          contractLanes={contractLanes}
          initialLaneIds={initialLaneIds}
          ignoreMap={ignoreMap}
          hasPermission={effectiveHasPermission}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
