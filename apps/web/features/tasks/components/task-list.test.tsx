import { render, screen } from '@/__tests__/render'

import type { Task } from '../types'

import { TaskList } from './task-list'

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'First task',
    status: 'todo',
    priority: 'high',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    dueDate: '2026-02-01T00:00:00.000Z',
    description: 'First task description',
  },
  {
    id: '2',
    title: 'Second task',
    status: 'done',
    priority: 'low',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
]

describe('TaskList', () => {
  it('renders all tasks', () => {
    render(<TaskList tasks={mockTasks} />)
    expect(screen.getByText('First task')).toBeInTheDocument()
    expect(screen.getByText('Second task')).toBeInTheDocument()
  })

  it('renders empty state when no tasks', () => {
    render(<TaskList tasks={[]} />)
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    expect(screen.getByText('Add your first task to get started.')).toBeInTheDocument()
  })

  it('passes onDelete to TaskCard when provided', () => {
    const onDelete = jest.fn()
    render(<TaskList tasks={mockTasks} onDelete={onDelete} />)

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    expect(deleteButtons).toHaveLength(2)
  })

  it('does not render delete buttons when onDelete is omitted', () => {
    render(<TaskList tasks={mockTasks} />)
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })
})
