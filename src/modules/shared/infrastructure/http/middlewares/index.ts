import { RedirectToOperationsMiddleware } from './redirect-to-operations.middleware'
import { WithAuthMiddleware } from './with-auth.middleware'

export const middlewares = {
  auth: WithAuthMiddleware,
  operations: RedirectToOperationsMiddleware
}
