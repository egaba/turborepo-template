type BreadcrumbItem = Readonly<{
  label: string
  href?: string
}>

type BreadcrumbProps = Readonly<{
  items: BreadcrumbItem[]
  className?: string
}>

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <div className={`breadcrumbs text-sm ${className}`.trim()}>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? (
              <a href={item.href} className="text-base-content/60 hover:text-base-content">
                {item.label}
              </a>
            ) : (
              <span className="text-base-content">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
