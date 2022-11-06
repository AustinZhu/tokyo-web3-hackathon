import { BigNumber } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { Token } from 'src/types/token'

interface InventoryItemProps {
  token: Token
  handlePoint: () => Promise<void>
  getPointBalance: () => Promise<BigNumber>
}

export const InventoryItem: FC<InventoryItemProps> = (props) => {
  const [pointBalance, setPointBalance] = useState<BigNumber>(BigNumber.from(0))

  useEffect(() => {
    const getBalance = async () => {
      const balance = await props.getPointBalance()
      setPointBalance(balance)
    }
    getBalance()
  }, [props])

  return (
    <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <a href='#'>
        <img className='rounded-t-lg' src={props.token.image} alt='' />
      </a>
      <div className='p-5'>
        <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {props.token.name}
          </h5>
        </a>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {props.token.description}
        </p>
        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
          <div
            className='bg-blue-600 h-2.5 rounded-full'
            style={{ width: pointBalance.toNumber() + '%' }}
          ></div>
        </div>
        <p className='mt-2'>{pointBalance.toNumber()}/100</p>
        <button
          onClick={props.handlePoint}
          className='inline-flex items-center mt-4 py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Of course!
        </button>
      </div>
    </div>
  )
}
