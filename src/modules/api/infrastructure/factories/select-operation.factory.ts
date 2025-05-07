import type { NextRequest, NextResponse } from 'next/server'
import { SelectOperationRepository } from '../repositories/select-operation.repository'
import { NextCookie } from '../cookie/next/next-cookie'

export class SelectOperationFactory {
  static create(
    req: NextRequest,
    res: NextResponse
  ): SelectOperationRepository {
    const storage = new NextCookie(req, res)
    return new SelectOperationRepository(storage)
  }
}
