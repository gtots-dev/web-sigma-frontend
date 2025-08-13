import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export async function GET(): Promise<NextResponse> {
  const { token } = await auth()
  const getContractsFactory = GetContractsFactory.create()
  try {
    const response = await getContractsFactory.execute(token)
    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.OK)
    })
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: error.message
        },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }
  }
}
