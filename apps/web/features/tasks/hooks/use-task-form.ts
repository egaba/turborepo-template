'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createTaskSchema } from '../schemas/task-schema'
import type { CreateTaskInput } from '../types'

const OPTIONAL_FIELDS = new Set(['dueDate', 'description'])

function cleanOptionalFields(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      OPTIONAL_FIELDS.has(key) && value === '' ? undefined : value,
    ]),
  )
}

export function useTaskForm(defaultValues?: Partial<CreateTaskInput>) {
  return useForm<CreateTaskInput>({
    resolver: (values, context, options) =>
      zodResolver(createTaskSchema)(
        cleanOptionalFields(values) as CreateTaskInput,
        context,
        options,
      ),
    defaultValues: {
      title: '',
      status: 'todo',
      priority: 'medium',
      ...defaultValues,
    },
  })
}
