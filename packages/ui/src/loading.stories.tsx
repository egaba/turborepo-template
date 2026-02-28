import type { Meta, StoryObj } from '@storybook/react'
import { Spinner, Skeleton, LoadingOverlay } from './loading'
import { Card } from './card'

const spinnerMeta: Meta<typeof Spinner> = {
  title: 'Components/Loading/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
}

export default spinnerMeta
type SpinnerStory = StoryObj<typeof Spinner>

export const Default: SpinnerStory = {
  args: { size: 'md', variant: 'spinner' },
}

export const AllVariants: SpinnerStory = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="spinner" size="lg" />
        <span className="text-sm">spinner</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" size="lg" />
        <span className="text-sm">dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="ring" size="lg" />
        <span className="text-sm">ring</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="ball" size="lg" />
        <span className="text-sm">ball</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size="lg" />
        <span className="text-sm">bars</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="infinity" size="lg" />
        <span className="text-sm">infinity</span>
      </div>
    </div>
  ),
}

export const AllSizes: SpinnerStory = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-sm">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-sm">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-sm">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-sm">lg</span>
      </div>
    </div>
  ),
}

export const SkeletonTextLines: SpinnerStory = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
}

export const SkeletonCardPlaceholder: SpinnerStory = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
}

export const SkeletonAvatarPlaceholder: SpinnerStory = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}

export const OverlayOnCard: SpinnerStory = {
  render: () => (
    <LoadingOverlay loading={true}>
      <Card title="Dashboard">
        <p>Revenue: $12,340</p>
        <p>Users: 1,245</p>
        <p>Orders: 342</p>
      </Card>
    </LoadingOverlay>
  ),
}

export const OverlayInactive: SpinnerStory = {
  render: () => (
    <LoadingOverlay loading={false}>
      <Card title="Dashboard">
        <p>Revenue: $12,340</p>
        <p>Users: 1,245</p>
        <p>Orders: 342</p>
      </Card>
    </LoadingOverlay>
  ),
}
