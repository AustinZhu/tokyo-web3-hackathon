import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { programState } from 'src/hooks/use-program'
import { useRevoke } from 'src/hooks/use-revoke'
import { TokenBalance } from 'src/types/token'

export const RevokePage = () => {
  const [program] = useRecoilState(programState)
  const { getTokenBalances, revoke } = useRevoke(program.addr)
  const [inputAddr, setInputAddr] = useState('')
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])

  return (
    <div>
      <h1 className='font-bold text-2xl mb-6'>Revoke</h1>
      <h2 className='font-medium text-xl mb-4 mt-10'>Search Address</h2>
      <form className='flex items-center'>
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-80'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            onChange={(e) => {
              setInputAddr(e.target.value)
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search'
            required
          ></input>
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault()
            console.log(inputAddr)
            const balances = await getTokenBalances(inputAddr)
            setTokenBalances(balances ?? [])
          }}
          type='button'
          className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </form>
      <h2 className='font-medium text-xl mb-4 mt-10'>Balance</h2>
      <div className='overflow-x-auto relative'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Type
              </th>
              <th scope='col' className='py-3 px-6'>
                Value
              </th>
              <th scope='col' className='py-3 px-6'>
                Validity
              </th>
              <th scope='col' className='py-3 px-6'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tokenBalances.map((tokenBalance) => (
              <tr
                key={tokenBalance.id.toString()}
                className='border-b border-gray-200 dark:border-gray-600'
              >
                <td className='py-3 px-6'>{tokenBalance.name}</td>
                <td className='py-3 px-6'>{tokenBalance.type}</td>
                <td className='py-3 px-6'>{tokenBalance.value}</td>
                <td className='py-3 px-6'>{tokenBalance.valid ? 'Yes' : 'No'}</td>
                <td className='py-3 px-6'>
                  {tokenBalance.valid ? (
                    <button
                      onClick={async (e) => {
                        e.preventDefault()
                        await revoke(tokenBalance.id)
                      }}
                      type='button'
                      className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      Revoke
                    </button>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RevokePage
