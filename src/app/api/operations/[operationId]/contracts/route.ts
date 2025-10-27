import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostContractFactory } from '@/modules/contracts/infrastructure/factories/post-contract.factory'
import { PutContractFactory } from '@/modules/contracts/infrastructure/factories/put-contract.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<UrlParams> }
): Promise<NextResponse> {
  try {
    const [authResult, { operationId }] = await Promise.all([auth(), params])
    const { token } = authResult

    if (!operationId) {
      return NextResponse.json(
        { success: false, message: 'operationId é obrigatório' },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }

    const getContractsFactory = GetContractsFactory.create()
    const response = await getContractsFactory.execute(token, { operationId })

    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.OK)
    })
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        { success: false, data: null, message: error.message },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }

    return NextResponse.json(
      { success: false, data: null, message: 'Erro inesperado' },
      { status: Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) }
    )
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await auth()
    const contract = await req.json()
    const postContract = PostContractFactory.create()
    await postContract.execute(token, contract)
    return NextResponse.json(
      {
        success: true
      },
      { status: Number(HttpStatusCodeEnum.OK) }
    )
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
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Erro inesperado'
      },
      { status: Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) }
    )
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await auth()
    const contract = await req.json()
    const putContract = PutContractFactory.create()
    await putContract.execute(token, contract)
    return NextResponse.json(
      {
        success: true
      },
      { status: Number(HttpStatusCodeEnum.OK) }
    )
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
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Erro inesperado'
      },
      { status: Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) }
    )
  }
}
