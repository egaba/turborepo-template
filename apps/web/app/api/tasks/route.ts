import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import { taskStore } from '@/features/tasks/data/task-store'
import { createTaskSchema } from '@/features/tasks/schemas/task-schema'

export async function GET() {
  const tasks = taskStore.getAll()
  return NextResponse.json({ data: tasks, status: 'success' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = createTaskSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  const task = taskStore.create(parsed.data)
  return NextResponse.json({ data: task, status: 'success' }, { status: StatusCodes.CREATED })
}
