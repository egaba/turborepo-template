import { Card } from '@repo/ui/card'

import { taskStore } from '@/features/tasks/data/task-store'

export default function DashboardPage() {
  const tasks = taskStore.getAll()
  const total = tasks.length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const completed = tasks.filter((t) => t.status === 'done').length

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-base-content">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Total Tasks">
          <p className="text-3xl font-bold text-primary">{total}</p>
        </Card>
        <Card title="In Progress">
          <p className="text-3xl font-bold text-warning">{inProgress}</p>
        </Card>
        <Card title="Completed">
          <p className="text-3xl font-bold text-success">{completed}</p>
        </Card>
      </div>
    </div>
  )
}
