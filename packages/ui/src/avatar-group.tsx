type AvatarItem = Readonly<{
  src?: string
  alt: string
  fallback?: string
}>

type AvatarSize = 'sm' | 'md' | 'lg'

type AvatarGroupProps = Readonly<{
  avatars: AvatarItem[]
  max?: number
  size?: AvatarSize
  className?: string
}>

const sizeClass: Record<AvatarSize, string> = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
}

function getInitials(alt: string, fallback?: string): string {
  if (fallback) return fallback
  return alt
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function AvatarGroup({ avatars, max = 5, size = 'md', className = '' }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className={`flex -space-x-2 ${className}`.trim()}>
      {visible.map((avatar, index) => (
        <div
          key={`${avatar.alt}-${index}`}
          className={`${sizeClass[size]} border-base-100 bg-primary text-primary-content inline-flex items-center justify-center rounded-full border-2 ring-0`}
          title={avatar.alt}
        >
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="font-medium leading-none">
              {getInitials(avatar.alt, avatar.fallback)}
            </span>
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={`${sizeClass[size]} border-base-100 bg-base-300 text-base-content inline-flex items-center justify-center rounded-full border-2`}
        >
          <span className="font-medium leading-none">+{overflow}</span>
        </div>
      )}
    </div>
  )
}
