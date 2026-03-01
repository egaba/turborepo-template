# Forms & Validation

react-hook-form + Zod patterns, reusable form fields, mutations, multi-step forms, and shared schemas.

## Basic Form

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm({ onSubmit }: { onSubmit: (data: ContactFormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function handleFormSubmit(data: ContactFormData) {
    await onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <FormField label="Name" error={errors.name?.message}>
        <input
          {...register('name')}
          className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
        />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
        />
      </FormField>
      <FormField label="Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          className={`textarea textarea-bordered ${errors.message ? 'textarea-error' : ''}`}
        />
      </FormField>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? <span className="loading loading-spinner" /> : 'Submit'}
      </button>
    </form>
  )
}
```

## Reusable Form Field

```tsx
type FormFieldProps = {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
}
```

## Form with Mutation

```tsx
function CreateProductForm() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      reset()
    },
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  })
  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {error && <div className="alert alert-error">{error.message}</div>}
      {/* form fields */}
      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? <span className="loading loading-spinner" /> : 'Create'}
      </button>
    </form>
  )
}
```

## Multi-Step Form

```tsx
const stepSchemas = {
  personal: z.object({ firstName: z.string().min(1), lastName: z.string().min(1) }),
  contact: z.object({ email: z.string().email(), phone: z.string().optional() }),
  review: z.object({}),
}
type StepKey = keyof typeof stepSchemas

function MultiStepForm() {
  const [step, setStep] = useState<StepKey>('personal')
  const [formData, setFormData] = useState({})
  const steps: StepKey[] = ['personal', 'contact', 'review']
  const currentIndex = steps.indexOf(step)

  function handleStepSubmit(data: Record<string, unknown>) {
    setFormData((prev) => ({ ...prev, ...data }))
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1])
    else submitFinalForm({ ...formData, ...data })
  }

  return (
    <div>
      <ul className="steps mb-8 w-full">
        {steps.map((s, i) => (
          <li key={s} className={`step ${i <= currentIndex ? 'step-primary' : ''}`}>
            {s}
          </li>
        ))}
      </ul>
      <StepForm schema={stepSchemas[step]} onSubmit={handleStepSubmit} />
    </div>
  )
}
```

## Shared Zod Schemas (Client + Server)

```typescript
// lib/schemas/product.ts
export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'food']),
})
export type CreateProductInput = z.infer<typeof createProductSchema>
```

Form: `useForm({ resolver: zodResolver(createProductSchema) })`. API: `createProductSchema.safeParse(body)`.
