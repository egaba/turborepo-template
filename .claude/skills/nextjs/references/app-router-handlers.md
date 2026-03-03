# App Router Route Handlers

Route handler patterns for `app/api/*/route.ts` with Zod validation and typed responses.

## Architecture Overview

```
Browser --> app/api/*/route.ts --> Data Layer (store, DB, external API)
                  |
           Zod validates input, StatusCodes for HTTP status
```

- API routes live in `app/api/*/route.ts` and export named HTTP method functions (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Input validation via Zod `safeParse` before processing
- HTTP status codes via `http-status-codes` constants (never raw numbers)
- Responses use `ApiResponse<T>` shape for success, `ApiError` for errors

## Route Handler Patterns

### Simple GET Handler

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'healthy', timestamp: new Date().toISOString() })
}
```

### GET with Data

```typescript
// app/api/tasks/route.ts
import { NextResponse } from 'next/server'
import { taskStore } from '@/features/tasks/data/task-store'

export async function GET() {
  const tasks = taskStore.getAll()
  return NextResponse.json({ data: tasks, status: 'success' })
}
```

### POST with Zod Validation

```typescript
// app/api/tasks/route.ts
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'
import { createTaskSchema } from '@/features/tasks/schemas/task-schema'
import { taskStore } from '@/features/tasks/data/task-store'

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
```

### Dynamic Route with Params

```typescript
// app/api/tasks/[id]/route.ts
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'
import { taskStore } from '@/features/tasks/data/task-store'

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
```

## API Client (fetch-based)

```typescript
// lib/api-client.ts
export const apiClient = {
  get<T>(url: string, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'GET' })
  },
  post<T>(url: string, body?: unknown, options?: RequestOptions) {
    return request<ApiResponse<T>>(url, { ...options, method: 'POST', body })
  },
  // put, patch, delete follow the same pattern
}
```

No axios — uses native `fetch` with typed wrapper. Throws `ApiClientError` on non-OK responses.

## Rules

- Always validate request body with Zod `safeParse` before processing
- Always use `StatusCodes` constants from `http-status-codes`
- Success responses: `{ data: T, status: 'success' }`
- Error responses: `{ error: string, code: string, details?: unknown }`
- Import from feature modules via barrel exports when possible
- Dynamic route params use `Promise<{ paramName: string }>` in Next.js 15+
