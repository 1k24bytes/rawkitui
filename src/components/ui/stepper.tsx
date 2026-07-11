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
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full space-y-4 font-sans', className)}>
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={cn(
                    'w-9 h-9 rounded-full rk-border-sm flex items-center justify-center font-mono font-black text-sm rk-shadow-sm transition-colors duration-200 select-none shrink-0 aspect-square p-0',
                    isCompleted
                      ? 'bg-[#4ADE80] text-[#18181B]'
                      : isCurrent
                      ? 'bg-[#FDE047] text-[#18181B] shadow-[3px_3px_0_0_#18181b]'
                      : 'bg-white text-[#18181B]/50'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3.5]" /> : stepNumber}
                </motion.div>
                <div className="hidden sm:block">
                  <div
                    className={cn(
                      'font-extrabold text-xs leading-tight',
                      isCurrent ? 'text-[#18181B]' : 'text-[#18181B]/60'
                    )}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-2 bg-white rounded-full rk-border-sm relative overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-[#4ADE80]"
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
