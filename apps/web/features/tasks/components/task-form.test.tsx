import { render, screen, userEvent, waitFor } from '@/__tests__/render'

import { TaskForm } from './task-form'

describe('TaskForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders all form fields', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save task/i })).toBeInTheDocument()
  })

  it('shows validation error when title is empty', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: /save task/i }))

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    })
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when valid', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />)

    await userEvent.type(screen.getByLabelText(/title/i), 'New task')
    await userEvent.click(screen.getByRole('button', { name: /save task/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
    expect(mockOnSubmit.mock.calls[0]?.[0]).toEqual(expect.objectContaining({ title: 'New task' }))
  })

  it('shows Saving... text when isPending', () => {
    render(<TaskForm onSubmit={mockOnSubmit} isPending />)
    expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled()
  })

  it('populates fields from defaultValues', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        defaultValues={{ title: 'Existing task', status: 'in_progress', priority: 'high' }}
      />,
    )

    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing task')
    expect(screen.getByLabelText(/status/i)).toHaveValue('in_progress')
    expect(screen.getByLabelText(/priority/i)).toHaveValue('high')
  })
})
