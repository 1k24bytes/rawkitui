import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1, className, ...props }: PaginationProps) {
  const pages = React.useMemo<(number | 'ellipsis')[]>(() => {
    const visibleCount = siblingCount * 2 + 5
    if (totalPages <= visibleCount) return Array.from({ length: totalPages }, (_, index) => index + 1)
    const left = Math.max(currentPage - siblingCount, 2)
    const right = Math.min(currentPage + siblingCount, totalPages - 1)
    const result: (number | 'ellipsis')[] = [1]
    if (left > 2) result.push('ellipsis')
    for (let page = left; page <= right; page += 1) result.push(page)
    if (right < totalPages - 1) result.push('ellipsis')
    result.push(totalPages)
    return result
  }, [currentPage, siblingCount, totalPages])

  const goTo = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange(page)
  }

  return (
    <nav aria-label="Pagination" className={cn('font-sans', className)} {...props}>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)} className="flex h-10 items-center gap-1 rounded-full bg-rk-surface px-3 text-xs font-extrabold rk-border-sm rk-shadow-sm hover:bg-rk-primary focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-40">
          <ChevronLeft className="h-4 w-4 stroke-[3]" aria-hidden="true" /><span className="hidden sm:inline">Previous</span>
        </button>
        <div className="flex items-center gap-1" role="list">
          {pages.map((page, index) => page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="flex h-10 w-8 items-center justify-center text-black/45" aria-hidden="true"><MoreHorizontal className="h-4 w-4" /></span>
          ) : (
            <button key={page} type="button" role="listitem" aria-label={`Page ${page}`} aria-current={page === currentPage ? 'page' : undefined} onClick={() => goTo(page)} className={cn('flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-black transition-colors focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2', page === currentPage ? 'bg-rk-primary rk-border-sm rk-shadow-sm' : 'bg-rk-surface hover:bg-rk-mint')}>{page}</button>
          ))}
        </div>
        <button type="button" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => goTo(currentPage + 1)} className="flex h-10 items-center gap-1 rounded-full bg-rk-surface px-3 text-xs font-extrabold rk-border-sm rk-shadow-sm hover:bg-rk-primary focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-40">
          <span className="hidden sm:inline">Next</span><ChevronRight className="h-4 w-4 stroke-[3]" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
