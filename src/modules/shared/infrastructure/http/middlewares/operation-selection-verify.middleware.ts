import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isSelectionOperationRoutes, PATHNAMES } from '../../config/pathnames.config';

export async function OperationSelectionVerifyMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { OPERATIONS } = PATHNAMES;
  const operationId = req.cookies.get('operation')

  const isRestrictedRoute = !!isSelectionOperationRoutes(pathname);
  const isMissingOperationId = !operationId;

  if (isRestrictedRoute && isMissingOperationId) {
    return NextResponse.redirect(new URL(OPERATIONS, req.url));
  }
}