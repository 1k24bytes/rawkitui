import * as React from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
  current?: boolean
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  maxItems?: number
}

export function Breadcrumb({ items, maxItems, className, ...props }: BreadcrumbProps) {
  const visibleItems: BreadcrumbItem[] = maxItems && items.length > maxItems
    ? [items[0], { label: <MoreHorizontal className="h-4 w-4" aria-label="More breadcrumbs" /> }, ...items.slice(-Math.max(1, maxItems - 2))]
    : items

  return (
    <nav aria-label="Breadcrumb" className={cn('font-sans', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-extrabold">
        {visibleItems.map((item, index) => {
          const isCurrent = item.current || index === visibleItems.length - 1
          return (
            <React.Fragment key={`${index}-${String(item.label)}`}>
              {index > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-black/45" aria-hidden="true" />}
              <li className="flex min-w-0 items-center">
                {isCurrent || !item.href ? (
                  <span aria-current={isCurrent ? 'page' : undefined} className={cn('truncate', isCurrent ? 'text-[#18181B]' : 'text-black/55')}>
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href} className="truncate rounded-md px-1 py-0.5 text-black/65 underline-offset-2 hover:bg-[#FDE047] hover:underline focus:outline-none focus:ring-2 focus:ring-black">
                    {item.label}
                  </a>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
