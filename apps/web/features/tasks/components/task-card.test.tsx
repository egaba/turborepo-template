import { render, screen, userEvent } from '@/__tests__/render'

import type { Task } from '../types'

import { TaskCard } from './task-card'

const mockTask: Task = {
  id: '1',
  title: 'Fix authentication bug',
  status: 'in_progress',
  priority: 'high',
  dueDate: '2026-03-05T17:00:00.000Z',
  description: 'Users are redirected to 404 after OAuth login',
  createdAt: '2026-02-20T00:00:00.000Z',
  updatedAt: '2026-02-20T00:00:00.000Z',
}

describe('TaskCard', () => {
  it('renders the task title', () => {
    render(<TaskCard task={mockTask} />)
    expect(screen.getByText('Fix authentication bug')).toBeInTheDocument()
  })

  it('renders the status and priority badges', () => {
    render(<TaskCard task={mockTask} />)
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<TaskCard task={mockTask} />)
    expect(screen.getByText('Users are redirected to 404 after OAuth login')).toBeInTheDocument()
  })

  it('does not render description when absent', () => {
    const taskWithoutDesc = { ...mockTask, description: undefined }
    render(<TaskCard task={taskWithoutDesc} />)
    expect(
      screen.queryByText('Users are redirected to 404 after OAuth login'),
    ).not.toBeInTheDocument()
  })

  it('renders due date when provided', () => {
    render(<TaskCard task={mockTask} />)
    expect(screen.getByText(/Due:/)).toBeInTheDocument()
  })

  it('does not render due date when absent', () => {
    const taskWithoutDue = { ...mockTask, dueDate: undefined }
    render(<TaskCard task={taskWithoutDue} />)
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument()
  })

  it('renders delete button when onDelete is provided', () => {
    render(<TaskCard task={mockTask} onDelete={jest.fn()} />)
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('does not render delete button when onDelete is absent', () => {
    render(<TaskCard task={mockTask} />)
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  it('calls onDelete with task id when delete is clicked', async () => {
    const handleDelete = jest.fn()
    render(<TaskCard task={mockTask} onDelete={handleDelete} />)

    await userEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleDelete).toHaveBeenCalledWith('1')
  })
})
