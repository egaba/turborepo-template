'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

type Column<T> = Readonly<{
  key: string
  header: string
  sortable?: boolean
  render?: (row: T) => ReactNode
  className?: string
}>

type SortDirection = 'asc' | 'desc'

type DataTableProps<T> = Readonly<{
  columns: Column<T>[]
  data: T[]
  selectable?: boolean
  onRowClick?: (row: T) => void
  className?: string
}>

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  onRowClick,
  className = '',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function toggleRow(index: number) {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  function toggleAll() {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(data.map((_, i) => i)))
    }
  }

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (aVal == null && bVal == null) return 0
        if (aVal == null) return 1
        if (bVal == null) return -1
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  return (
    <div className={`overflow-x-auto ${className}`.trim()}>
      <table className="table table-sm">
        <thead>
          <tr>
            {selectable && (
              <th className="w-10">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${col.className ?? ''} ${col.sortable ? 'cursor-pointer select-none hover:bg-base-200' : ''}`}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={sortDir === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                      />
                    </svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${onRowClick ? 'cursor-pointer hover:bg-base-200' : ''} ${selectedRows.has(rowIndex) ? 'bg-accent/5' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {selectable && (
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={selectedRows.has(rowIndex)}
                    onChange={(e) => {
                      e.stopPropagation()
                      toggleRow(rowIndex)
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className={col.className}>
                  {col.render
                    ? col.render(row)
                    : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-8 text-center text-base-content/50"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
