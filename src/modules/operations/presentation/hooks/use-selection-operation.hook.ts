import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { SetSelectionOperationService } from '../../infrastructure/services/set-operation.service'
import { GetSelectionOperationService } from '../../infrastructure/services/get-operation.service'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'

export function useSelectionOperation() {
  const httpClient = HttpClientFactory.create('/')
  const executeRequest = ExecuteRequestFactory.create(httpClient)
  const setSelectionOperation = new SetSelectionOperationService(executeRequest)
  const getSelectionOperation = new GetSelectionOperationService(executeRequest)

  const { replace } = useRouter()

  async function setOperation(operation: OperationInterface) {
    try {
      await setSelectionOperation.setSelectionOperation(operation)
      replace(PATHNAMES.OPERATION_OPTIONS)
    } catch (error) {
      console.error('Error setting operation:', error)
    }
  }

  const getOperation = useCallback(async () => {
    const { id, name } = await getSelectionOperation.getSelectionOperation()
    return { id, name }
  }, [])

  return { setOperation, getOperation }
}
