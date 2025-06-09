import { RedirectToOperationsMiddleware } from './redirect-to-operations.middleware'
import { WithAuthMiddleware } from './with-auth.middleware'
import { OperationSelectionVerifyMiddleware } from './operation-selection-verify.middleware'
export const middlewares = {
  auth: WithAuthMiddleware,
  operations: RedirectToOperationsMiddleware,
  OperationSelectionVerify: OperationSelectionVerifyMiddleware
}
