export interface StepsProps {
  current: number
  titles: string[]
  className?: string
}

export const Steps = ({ current, titles, className }: StepsProps) => {
  const completedStep = () => (
    <span className='rounded bg-green-50 p-1.5 text-green-600 dark:bg-green-900 dark:text-green-300'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-3 w-3'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        />
      </svg>
    </span>
  )

  const StepItems = () =>
    titles.map((title, index) => (
      <li
        key={title}
        className={`flex items-center justify-center ${
          current === index + 1
            ? 'text-blue-600 dark:text-blue-300'
            : 'text-black dark:text-gray-100'
        }`}
      >
        {current > index + 1 ? (
          completedStep()
        ) : (
          <span
            className={`h-6 w-6 rounded ${
              current === index + 1 ? 'bg-blue-50 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-900'
            } text-center text-[10px] font-bold leading-6`}
          >
            {index + 1}
          </span>
        )}
        <span className='ml-2'>{title}</span>
      </li>
    ))

  return (
    <div className={className}>
      <ol className='flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4'>
        {StepItems()}
      </ol>
    </div>
  )
}
