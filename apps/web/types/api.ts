export type ApiResponse<T> = {
  data: T
  status: 'success' | 'error'
  message?: string
}

export type ApiError = {
  error: string
  code: string
  details?: unknown
}

export type PaginatedResponse<T> = ApiResponse<T> & {
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
