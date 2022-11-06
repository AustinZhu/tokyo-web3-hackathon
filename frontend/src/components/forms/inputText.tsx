import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  leftText?: string
  labelClassName?: string
  wrapperClassName?: string
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, leftText, labelClassName, wrapperClassName, className, ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={props.id}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${labelClassName}`}
        >
          {label}
          {props.required ? <span className='text-red-500'>*</span> : null}
        </label>
        <div className='flex flex-row items-center'>
          {leftText}
          <input
            type='text'
            className={`${
              leftText ? 'ml-3' : ''
            } border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
              props.readOnly
                ? 'focus:ring-0 focus:border-gray-300 cursor-default'
                : 'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            } ${className}`}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  },
)
InputText.displayName = 'InputText'
