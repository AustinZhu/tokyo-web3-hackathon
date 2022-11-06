import { LinkButton } from '@/components/atom/button'
import { CollectionCard } from '@/components/block/collectionCard'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useCollection } from 'src/hooks/use-collection'
import { programState } from 'src/hooks/use-program'
import { Collection } from 'src/types/token'

export const CollectionPage = () => {
  const [currentProgram] = useRecoilState(programState)
  const { getCollections } = useCollection(currentProgram?.addr)
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getCollections()
      setCollections(collections)
    }
    fetchCollections()
  }, [currentProgram])

  return (
    <>
      <div className='flex flex-row mb-8'>
        <h1 className='font-bold text-3xl mr-12'>Collection</h1>
        <LinkButton
          href='/collection/create'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          + Create Collection
        </LinkButton>
      </div>
      <div className='flex flex-wrap'>
        {collections.map((collection) => (
          <CollectionCard
            className='mr-8'
            key={collection.id.toString()}
            imagePath={collection.image}
            title={collection.name}
          />
        ))}
      </div>
    </>
  )
}

export default CollectionPage
