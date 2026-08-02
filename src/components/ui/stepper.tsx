import * as React from 'react'
import { motion } from 'motion/react'
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
  onStepClick?: (stepId: number | string, index: number) => void
  className?: string
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <div role="list" aria-label="Progress steps" className={cn('w-full space-y-4 font-sans', className)}>
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isClickable = typeof onStepClick === 'function'

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(step.id, index)}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${stepNumber}: ${step.label}${isCompleted ? ' (completed)' : ''}`}
                  className={cn(
                    'group flex items-center gap-2 rounded-full p-1 pr-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2',
                    isClickable && 'cursor-pointer'
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className={cn(
                      'w-9 h-9 rounded-full rk-border-sm flex items-center justify-center font-mono font-black text-sm rk-shadow-sm transition-colors duration-200 select-none shrink-0 aspect-square p-0',
                      isCompleted
                        ? 'bg-rk-success text-rk-ink'
                        : isCurrent
                        ? 'bg-rk-primary text-rk-ink'
                        : 'bg-rk-surface text-rk-ink/50',
                      isClickable && !isCurrent && !isCompleted && 'group-hover:bg-rk-primary/60'
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3.5]" aria-hidden="true" /> : stepNumber}
                  </motion.div>
                  <div className="hidden sm:block text-left">
                    <div
                      className={cn(
                        'font-extrabold text-xs leading-tight',
                        isCurrent ? 'text-rk-ink' : 'text-rk-ink/60'
                      )}
                    >
                      {step.label}
                    </div>
                    {step.description && (
                      <div className="text-[10px] font-bold text-rk-ink/40">{step.description}</div>
                    )}
                  </div>
                </motion.button>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-2 bg-rk-surface rounded-full rk-border-sm relative overflow-hidden" aria-hidden="true">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-rk-success"
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
