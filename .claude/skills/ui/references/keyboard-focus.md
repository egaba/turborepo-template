# Keyboard Navigation, Focus & Accessibility Testing

Keyboard navigation, focus management, skip links, manual a11y checklist, and testing tools.

## Focus Order

- Interactive elements must follow a logical reading order
- Use `tabIndex={0}` to add custom elements to tab order (rare -- prefer semantic elements)
- Use `tabIndex={-1}` to make elements programmatically focusable but not in tab order
- Never use `tabIndex` values greater than 0

## Arrow Key Navigation (Menus, Tabs)

For grouped controls like menus and tabs, implement arrow key navigation:

```tsx
function handleKeyDown(e: React.KeyboardEvent, items: string[], currentIndex: number) {
  let nextIndex = currentIndex

  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault()
      nextIndex = (currentIndex + 1) % items.length
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault()
      nextIndex = (currentIndex - 1 + items.length) % items.length
      break
    case 'Home':
      e.preventDefault()
      nextIndex = 0
      break
    case 'End':
      e.preventDefault()
      nextIndex = items.length - 1
      break
  }

  if (nextIndex !== currentIndex) {
    setActiveIndex(nextIndex)
    document.getElementById(`item-${nextIndex}`)?.focus()
  }
}
```

## Escape Key

Modals, dropdowns, and popovers must close on `Escape`:

```tsx
useEffect(() => {
  function handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [onClose])
```

## Focus Management

### Modal Focus Trap

DaisyUI's `<dialog>` handles focus trapping natively with `showModal()`. Prefer this over custom implementations:

```tsx
dialogRef.current?.showModal() // Open with native focus trap
dialogRef.current?.close() // Close
```

For custom modals, trap focus and restore on close:

```tsx
function useModalFocus(isOpen: boolean, modalRef: React.RefObject<HTMLDialogElement>) {
  const previousFocus = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement
      modalRef.current?.focus()
    } else {
      previousFocus.current?.focus()
    }
  }, [isOpen, modalRef])
}
```

### Focus After Deletion

When removing a list item, move focus to the next item or list container:

```tsx
function handleDelete(index: number) {
  deleteItem(index)
  const nextItem = document.querySelector(`[data-index="${Math.min(index, items.length - 2)}"]`)
  ;(nextItem as HTMLElement)?.focus()
}
```

## Skip Links

```tsx
<a
  href="#main-content"
  className="focus:bg-base-100 focus:text-base-content sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
>
  Skip to main content
</a>
```

---

## Manual Accessibility Checklist

For each component or page:

- [ ] All interactive elements reachable via Tab key
- [ ] Focus indicator visible on every focusable element
- [ ] Escape closes modals/dropdowns
- [ ] Screen reader announces dynamic content changes (live regions)
- [ ] Images have meaningful `alt` text (or `alt=""` for decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages linked to inputs via `aria-describedby`

## Automated Testing with @axe-core/react

```bash
pnpm add -D @axe-core/react
```

```tsx
// Add to development entry point (remove in production)
if (process.env.NODE_ENV === 'development') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
  })
}
```

## Browser A11y Tools

- **Chrome DevTools > Accessibility tab**: Inspect computed ARIA roles and properties
- **Lighthouse Accessibility audit**: Automated WCAG violation scanner
- **Chrome > Rendering > Emulate vision deficiencies**: Test color blindness scenarios
