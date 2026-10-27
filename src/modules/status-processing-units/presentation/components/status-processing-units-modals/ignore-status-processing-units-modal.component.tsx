'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'
import type { ProcessingUnitStatusInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-status-interface'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { IgnoreStatusProcessingUnitsForm } from '../ignore-status-processing-units-form'
import { useIgnoreStatusProcessingUnitsForm } from '../../hooks/use-ignore-status-processing-units-form.hook'
import { useStatusProcessingUnitById } from '../../hooks/use-status-processing-unit-by-id.hook'
import { useProcessingUnitsOptions } from '../../hooks/use-processing-units-options.hook'
import { useStatusProcessingUnitIgnores } from '../../hooks/use-status-processing-unit-ignores.hook'
import { usePostStatusProcessingUnitsSubmit } from '../../hooks/use-post-status-processing-units-submit.hook'
import type { IgnoreStatusProcessingUnitsFormType } from '../../schemas/ignore-status-processing-units-form.schema'

export interface IgnoreStatusProcessingUnitsModalProps {
  title: string
  description: string
  statusId: number
  hasPermission?: boolean
  onClose?: () => void
  onReturn?: () => void
}

interface IgnoreStatusProcessingUnitsFormBodyProps {
  title: string
  description: string
  status: ProcessingUnitStatusInterface
  initialProcessingUnitIds: number[]
  ignoreMap: Map<number, number>
  hasPermission?: boolean
  onClose: () => void
}

function IgnoreStatusProcessingUnitsFormBody({
  title,
  description,
  status,
  initialProcessingUnitIds,
  ignoreMap,
  hasPermission = true,
  onClose
}: IgnoreStatusProcessingUnitsFormBodyProps) {
  const { methods } = useIgnoreStatusProcessingUnitsForm(
    initialProcessingUnitIds
  )
  const { onAction, submitting } = usePostStatusProcessingUnitsSubmit()

  const handleSubmit = async (data: IgnoreStatusProcessingUnitsFormType) => {
    await onAction({
      statusId: status.id,
      statusCode: status.code,
      initialProcessingUnitIds,
      ignoreMap,
      selectedProcessingUnitIds: data.processingUnitIds,
      onSuccess: onClose
    })
  }

  return (
    <FormProvider {...methods}>
      <ModalShell.Header title={title} description={description} />
      <ModalShell.Content>
        <IgnoreStatusProcessingUnitsForm.Form
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

          <IgnoreStatusProcessingUnitsForm.Input.ProcessingUnits
            hasPermission={hasPermission}
          />
        </IgnoreStatusProcessingUnitsForm.Form>
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

export function IgnoreStatusProcessingUnitsModal({
  title,
  description,
  statusId,
  hasPermission = true,
  onClose,
  onReturn
}: IgnoreStatusProcessingUnitsModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const {
    status,
    loading: loadingStatus,
    error: statusError
  } = useStatusProcessingUnitById(statusId)
  const {
    processingUnits,
    loading: loadingUnits,
    error: unitsError
  } = useProcessingUnitsOptions(hasPermission)
  const {
    initialProcessingUnitIds,
    ignoreMap,
    loading: loadingIgnores
  } = useStatusProcessingUnitIgnores(statusId, processingUnits)

  const loading = loadingStatus || loadingUnits || loadingIgnores
  const effectiveHasPermission = hasPermission && unitsError?.status !== 403

  if (statusError?.status === 403) {
    return <UnauthorizedModalToast message={statusError.message} />
  }

  if (!loading && !status) {
    return (
      <ModalShell.Empty
        title={MESSAGES_STATUS_PROCESSING_UNITS['25.9']}
        description={`O status solicitado com o ID ${statusId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && status && (
        <IgnoreStatusProcessingUnitsFormBody
          title={title}
          description={description}
          status={status}
          initialProcessingUnitIds={initialProcessingUnitIds}
          ignoreMap={ignoreMap}
          hasPermission={effectiveHasPermission}
          onClose={handleClose}
        />
      )}
    </ModalShell.Root>
  )
}
