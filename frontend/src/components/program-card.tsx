import { FC, useEffect, useState } from 'react'
import { useCollection } from 'src/hooks/use-collection'
import { useMint } from 'src/hooks/use-mint'
import { Collection, Program } from 'src/types/token'

interface ProgramCardProps {
  program: Program
  active?: boolean
}

export const ProgramCard: FC<ProgramCardProps> = (props) => {
  const [collections, setCollections] = useState<Collection[]>([])
  const { getCollections } = useCollection(props.program.addr)
  const { mint } = useMint(props.program.addr)

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getCollections()
      setCollections(collections ?? [])
    }
    fetchCollections()
  }, [])

  return (
    <div className='flex-auto p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <a href='#'>
        <img className='rounded-t-lg mb-4' src={props.program.image} alt='' />
      </a>
      <a href='#'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {props.program.name}
        </h5>
      </a>
      <ul className='w-48 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-white'>
        {collections?.map((collection) => (
          <li
            key={collection.id.toString()}
            className='flex items-center justify-between px-4 py-2'
          >
            <button
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={async () => {
                await mint(collection.id.toNumber())
              }}
            >
              {`Join ${collection.name}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
