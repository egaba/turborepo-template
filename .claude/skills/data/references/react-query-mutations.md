# React Query Mutations

Mutation patterns, cache invalidation, and optimistic updates.

## Basic Mutation with onSuccess/onError

```typescript
const queryClient = useQueryClient()

const { mutate, isPending, error } = useMutation({
  mutationFn: (input: CreateProductInput) => createProduct(input),
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
    router.push(`/products/${data.id}`)
  },
  onError: (error) => {
    showToast('error', 'Failed to create product. Please try again.')
  },
})
```

## Cache Invalidation After Mutation

```typescript
const { mutate: deleteProduct } = useMutation({
  mutationFn: (id: string) => apiClient.delete(`/api/products/${id}`),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
    queryClient.removeQueries({ queryKey: ['product', deletedId] })
  },
})
```

## Optimistic Updates

```typescript
const { mutate: toggleFavorite } = useMutation({
  mutationFn: (productId: string) => apiClient.post(`/api/favorites/${productId}`),
  onMutate: async (productId) => {
    await queryClient.cancelQueries({ queryKey: ['product', productId] })

    const previous = queryClient.getQueryData<Product>(['product', productId])

    queryClient.setQueryData<Product>(['product', productId], (old) =>
      old ? { ...old, isFavorite: !old.isFavorite } : old,
    )

    return { previous }
  },
  onError: (_err, productId, context) => {
    queryClient.setQueryData(['product', productId], context?.previous)
  },
  onSettled: (_data, _err, productId) => {
    queryClient.invalidateQueries({ queryKey: ['product', productId] })
  },
})
```
