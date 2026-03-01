'use server'

import { revalidatePath } from 'next/cache'

import type { ActionResult } from '@/types/api'

import { taskStore } from '../data/task-store'
import { createTaskSchema, updateTaskSchema } from '../schemas/task-schema'
import type { Task } from '../types'

export async function createTask(formData: FormData): Promise<ActionResult<Task>> {
  const raw = Object.fromEntries(formData)
  const parsed = createTaskSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const task = taskStore.create({
    title: parsed.data.title,
    status: parsed.data.status,
    priority: parsed.data.priority,
    dueDate: parsed.data.dueDate,
    description: parsed.data.description ?? undefined,
  })

  revalidatePath('/dashboard')
  return { success: true, data: task }
}

export async function updateTask(id: string, formData: FormData): Promise<ActionResult<Task>> {
  const raw = Object.fromEntries(formData)
  const parsed = updateTaskSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const task = taskStore.update(id, {
    ...(parsed.data.title !== undefined && { title: parsed.data.title }),
    ...(parsed.data.status !== undefined && { status: parsed.data.status }),
    ...(parsed.data.priority !== undefined && { priority: parsed.data.priority }),
    ...(parsed.data.dueDate !== undefined && { dueDate: parsed.data.dueDate }),
    ...(parsed.data.description !== undefined && { description: parsed.data.description }),
  })

  if (!task) {
    return { success: false, error: 'Task not found' }
  }

  revalidatePath('/dashboard')
  return { success: true, data: task }
}

export async function deleteTask(id: string): Promise<ActionResult> {
  const deleted = taskStore.delete(id)

  if (!deleted) {
    return { success: false, error: 'Task not found' }
  }

  revalidatePath('/dashboard')
  return { success: true, data: undefined }
}
