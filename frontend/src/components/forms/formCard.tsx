import { ReactNode } from 'react'

export interface FormCardProps {
  children: ReactNode
  className?: string
}

export const FormCard = ({ children, className }: FormCardProps) => {
  return (
    <div
      className={`p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  )
}
