import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Step {
  id: number | string
  label: string
  description?: string
}

export interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full rk-border-sm flex items-center justify-center font-mono font-black text-sm rk-shadow-sm transition-all duration-200',
                    isCompleted
                      ? 'bg-[#4ADE80] text-[#18181B]'
                      : isCurrent
                      ? 'bg-[#FDE047] text-[#18181B] scale-110 shadow-[3px_3px_0_0_#18181b]'
                      : 'bg-white text-[#18181B]/50'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : stepNumber}
                </div>
                <div className="hidden sm:block">
                  <div
                    className={cn(
                      'font-bold text-xs leading-tight',
                      isCurrent ? 'text-[#18181B]' : 'text-[#18181B]/60'
                    )}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-2 rounded-full rk-border-sm transition-all duration-300',
                    stepNumber < currentStep ? 'bg-[#4ADE80]' : 'bg-white'
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
