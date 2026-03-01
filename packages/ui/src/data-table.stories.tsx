import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './data-table'

type SampleRow = {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const meta: Meta<typeof DataTable<SampleRow>> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof DataTable<SampleRow>>

const sampleData: SampleRow[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending' },
]

const columns = [
  { key: 'id', header: 'ID', sortable: true, className: 'w-16' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row: SampleRow) => (
      <span
        className={`badge badge-sm ${
          row.status === 'Active'
            ? 'badge-success'
            : row.status === 'Pending'
              ? 'badge-warning'
              : 'badge-ghost'
        }`}
      >
        {row.status}
      </span>
    ),
  },
]

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
}

export const Selectable: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
  },
}

export const Clickable: Story = {
  args: {
    columns,
    data: sampleData,
    onRowClick: (row: SampleRow) => alert(`Clicked: ${row.name}`),
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
  },
}
