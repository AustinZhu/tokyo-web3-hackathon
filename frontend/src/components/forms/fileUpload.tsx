import { forwardRef, InputHTMLAttributes } from 'react'

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelClassName?: string
  wrapperClassName?: string
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, labelClassName, wrapperClassName, ...props }, ref) => {
    return (
      <div className={`flex flex-col w-full ${wrapperClassName}`}>
        <label
          htmlFor={props.id}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${labelClassName}`}
        >
          {label}
          {props.required ? <span className='text-red-500'>*</span> : null}
        </label>
        <input type='file' ref={ref} {...props} />
      </div>
    )
  },
)
FileUpload.displayName = 'FileUpload'
