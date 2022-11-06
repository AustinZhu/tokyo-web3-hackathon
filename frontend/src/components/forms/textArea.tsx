import { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  labelClassName?: string
  wrapperClassName?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelClassName, wrapperClassName, className, ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={props.id}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${labelClassName}`}
        >
          {label}
          {props.required ? <span className='text-red-500'>*</span> : null}
        </label>
        <textarea
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
TextArea.displayName = 'TextArea'
