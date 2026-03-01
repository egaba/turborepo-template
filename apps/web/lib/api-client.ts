import type { ApiResponse, ApiError } from '@/types/api'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: ApiError,
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  const response = await fetch(url, {
    ...rest,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as ApiError | null
    throw new ApiClientError(
      errorData?.error ?? `Request failed with status ${response.status}`,
      response.status,
      errorData ?? undefined,
    )
  }

  return (await response.json()) as T
}

export const apiClient = {
  get<T>(url: string, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'GET' })
  },

  post<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'POST', body })
  },

  put<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'PUT', body })
  },

  patch<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'PATCH', body })
  },

  delete<T>(url: string, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'DELETE' })
  },
}

export { ApiClientError }
