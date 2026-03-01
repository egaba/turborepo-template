import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import { taskStore } from '@/features/tasks/data/task-store'
import { updateTaskSchema } from '@/features/tasks/schemas/task-schema'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params
  const task = taskStore.getById(id)

  if (!task) {
    return NextResponse.json(
      { error: 'Task not found', code: 'NOT_FOUND' },
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json({ data: task, status: 'success' })
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params
  const body = await request.json()
  const parsed = updateTaskSchema.safeParse(body)

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

  const definedUpdates = Object.fromEntries(
    Object.entries(parsed.data).filter(([, v]) => v !== undefined),
  ) as Partial<Omit<import('@/features/tasks/types').Task, 'id' | 'createdAt' | 'updatedAt'>>
  const task = taskStore.update(id, definedUpdates)
  if (!task) {
    return NextResponse.json(
      { error: 'Task not found', code: 'NOT_FOUND' },
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json({ data: task, status: 'success' })
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params
  const deleted = taskStore.delete(id)

  if (!deleted) {
    return NextResponse.json(
      { error: 'Task not found', code: 'NOT_FOUND' },
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json({ data: null, status: 'success' })
}
