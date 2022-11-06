import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export interface LinkButtonProps extends ButtonProps {
  href: string
  openTab?: boolean
}

export const Button = ({ children, className, type = 'button', ...props }: ButtonProps) => {
  // Does not include text, background and any other colors
  return (
    <button
      type={type}
      className={`focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none disabled:cursor-not-allowed disabled:text-slate-700 disabled:bg-slate-400 disabled:hover:bg-slate-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const LinkButton = ({ href, openTab, children, className }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <a target={openTab ? '_blank' : undefined}>
        <Button className={className}>{children}</Button>
      </a>
    </Link>
  )
}
