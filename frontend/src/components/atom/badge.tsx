import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  className?: string
}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={`whitespace-nowrap rounded-full bg-blue-100 px-6 py-2 text-sm text-blue-500 ${className}`}
    >
      {children}
    </span>
  )
}
