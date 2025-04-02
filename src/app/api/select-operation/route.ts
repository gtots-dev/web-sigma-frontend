import { SelectOperationRepository } from '@/modules/api/infrastructure/repositories/select-operation.repository'
import { OperationFactory } from '@/modules/api/infrastructure/services/operation.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body?.id || !body?.name) {
      throw new Error('Missing fields')
    }

    const operation = OperationFactory.create({
      id: body.id,
      name: body.name
    })
    
    const response = NextResponse.json({ message: 'Operation Selected' })
    SelectOperationRepository.saveToCookies(response, operation)

    return response
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Invalid request' },
      { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const operation = SelectOperationRepository.getFromCookies(req)
    if (!operation) {
      return NextResponse.json(
        { error: 'No operation found' },
        { status: Number(HttpStatusCodeEnum.NOT_FOUND) }
      )
    }
    return NextResponse.json(operation)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid cookie data' },
      { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
    )
  }
}
