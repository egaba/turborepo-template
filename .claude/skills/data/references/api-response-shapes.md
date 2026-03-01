# API Response Shapes

Standard response types and HTTP status conventions for Next.js API routes.

## Success Response

```typescript
type ApiResponse<T> = {
  data: T
  status: 'success' | 'error'
  message?: string
}

type PaginatedResponse<T> = ApiResponse<T> & {
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
```

## Error Response

```typescript
type ApiError = {
  error: string
  code: string
  details?: unknown
}
```

Error codes should be stable, machine-readable strings (not HTTP status codes):

```typescript
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const
```

## HTTP Status Codes

Always use `http-status-codes` constants -- never raw numbers:

```typescript
import { StatusCodes } from 'http-status-codes'

return NextResponse.json(data, { status: StatusCodes.OK })
return NextResponse.json(data, { status: StatusCodes.CREATED })
return NextResponse.json(error, { status: StatusCodes.BAD_REQUEST })
return NextResponse.json(error, { status: StatusCodes.NOT_FOUND })
```
