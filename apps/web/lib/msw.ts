export async function initMSW(): Promise<void> {
  if (typeof window === 'undefined') return

  const { worker } = await import('@/mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
