import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGroup } from './avatar-group'

const meta: Meta<typeof AvatarGroup> = {
  title: 'Data Display/AvatarGroup',
  component: AvatarGroup,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

const sampleAvatars = [
  { alt: 'Alice Johnson' },
  { alt: 'Bob Smith' },
  { alt: 'Carol White' },
  { alt: 'David Brown' },
  { alt: 'Eve Davis' },
  { alt: 'Frank Miller' },
  { alt: 'Grace Lee' },
]

export const Default: Story = {
  args: {
    avatars: sampleAvatars,
  },
}

export const WithOverflow: Story = {
  args: {
    avatars: sampleAvatars,
    max: 3,
  },
}

export const Small: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    size: 'lg',
  },
}

export const WithFallbacks: Story = {
  args: {
    avatars: [
      { alt: 'Alice', fallback: 'A' },
      { alt: 'Bob', fallback: 'B' },
      { alt: 'Carol', fallback: 'C' },
    ],
    size: 'lg',
  },
}

export const SingleAvatar: Story = {
  args: {
    avatars: [{ alt: 'Solo User' }],
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size="sm" />
      <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size="md" />
      <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size="lg" />
    </div>
  ),
}
