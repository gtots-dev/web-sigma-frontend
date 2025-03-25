import { useCallback } from 'react'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { SelectionOperationService } from '../../infrastructure/services/set-operation.service'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import { useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'

const httpClient = HttpClientFactory.create('/')
const executeRequest = ExecuteRequestFactory.create(httpClient)
const selectionOperation = new SelectionOperationService(executeRequest)

export function useSelectionOperation() {
  const { replace } = useRouter()

  const setOperation = useCallback(async (operation: OperationInterface) => {
    await selectionOperation.setSelectionOperation(operation)
    replace(`${PATHNAMES.OPERATION_OPTIONS}`)
  }, [])

  return { setOperation }
}
