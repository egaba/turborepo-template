'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createTaskSchema } from '../schemas/task-schema'
import type { CreateTaskInput } from '../types'

export function useTaskForm(defaultValues?: Partial<CreateTaskInput>) {
  return useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      status: 'todo',
      priority: 'medium',
      description: '',
      ...defaultValues,
    },
  })
}
