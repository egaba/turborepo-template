type StepStatus = 'completed' | 'active' | 'upcoming'

type Step = Readonly<{
  label: string
  status: StepStatus
  sublabel?: string
}>

type StepperProps = Readonly<{
  steps: Step[]
  className?: string
}>

const stepCircleClass: Record<StepStatus, string> = {
  completed: 'bg-success text-success-content',
  active: 'bg-accent text-accent-content ring-4 ring-accent/20',
  upcoming: 'bg-base-300 text-base-content/40',
}

const stepLabelClass: Record<StepStatus, string> = {
  completed: 'text-base-content',
  active: 'text-accent font-medium',
  upcoming: 'text-base-content/40',
}

const connectorClass: Record<StepStatus, string> = {
  completed: 'bg-success',
  active: 'bg-base-300',
  upcoming: 'bg-base-300',
}

export function Stepper({ steps, className = '' }: StepperProps) {
  return (
    <div className={`flex items-start ${className}`.trim()}>
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-start">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${stepCircleClass[step.status]}`}
            >
              {step.status === 'completed' ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={`mt-2 text-center text-xs ${stepLabelClass[step.status]}`}>
              {step.label}
            </span>
            {step.sublabel && (
              <span className="text-base-content/40 text-center text-xs">{step.sublabel}</span>
            )}
          </div>

          {index < steps.length - 1 && (
            <div className="mt-4 flex flex-1 items-center px-2">
              <div className={`h-0.5 w-full ${connectorClass[step.status]}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
