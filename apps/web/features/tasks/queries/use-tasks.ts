'use client'

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/api-client'

import type { CreateTaskInput, Task } from '../types'

const TASKS_KEY = ['tasks'] as const

export function useTasks() {
  return useSuspenseQuery({
    queryKey: TASKS_KEY,
    queryFn: () => apiClient.get<Task[]>('/api/tasks'),
  })
}

export function useTask(id: string) {
  return useSuspenseQuery({
    queryKey: [...TASKS_KEY, id],
    queryFn: () => apiClient.get<Task>(`/api/tasks/${id}`),
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTaskInput) => apiClient.post<Task>('/api/tasks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<void>(`/api/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY })
    },
  })
}
