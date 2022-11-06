import { FC } from 'react'

interface PageHeadingProps {
  title: string
  description: string
}

export const PageHeading: FC<PageHeadingProps> = (props) => {
  return (
    <div className='flex-initial my-6'>
      <h1 className='text-gray-900 font-bold text-2xl my-1 dark:text-white'>{props.title}</h1>
      <p className='text-gray-700 font-normal text-base dark:text-gray-100'>{props.description}</p>
    </div>
  )
}
