import { ComponentProps, FC } from 'react'

export const ContactIcon: FC<ComponentProps<'svg'>> = () => {
  return (
    <svg width='24' height='24' viewBox='0 0 30 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_947_1555)'>
        <path
          d='M5 0C2.24219 0 0 2.24219 0 5V35C0 37.7578 2.24219 40 5 40H25C27.7578 40 30 37.7578 30 35V5C30 2.24219 27.7578 0 25 0H5ZM12.5 25H17.5C20.9531 25 23.75 27.7969 23.75 31.25C23.75 31.9375 23.1875 32.5 22.5 32.5H7.5C6.8125 32.5 6.25 31.9375 6.25 31.25C6.25 27.7969 9.04688 25 12.5 25ZM20 17.5C20 20.2578 17.7578 22.5 15 22.5C12.2422 22.5 10 20.2578 10 17.5C10 14.7422 12.2422 12.5 15 12.5C17.7578 12.5 20 14.7422 20 17.5ZM11.25 5H18.75C19.4375 5 20 5.5625 20 6.25C20 6.9375 19.4375 7.5 18.75 7.5H11.25C10.5625 7.5 10 6.9375 10 6.25C10 5.5625 10.5625 5 11.25 5Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_947_1555'>
          <rect width='30' height='40' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
