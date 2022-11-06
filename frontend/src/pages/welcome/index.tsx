import { LinkButton } from '@/components/atom/button'
import React from 'react'

const WelcomePage = () => {
  return (
    <>
      <div className='flex flex-row mb-8'>
        <h1 className='font-bold text-3xl mr-12'>Soulbound Program</h1>
        <LinkButton
          href='/program'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          + Create Program
        </LinkButton>
      </div>
      <h2 className='font-bold text-3xl'>Welcome to the Soularis Launchpad</h2>
    </>
  )
}

export default WelcomePage
