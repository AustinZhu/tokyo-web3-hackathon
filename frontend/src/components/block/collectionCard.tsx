import Image from 'next/image'
import Link from 'next/link'

export interface CollectionCardProps {
  imagePath: string
  title: string
  className?: string
}

export const CollectionCard = ({ imagePath, title, className }: CollectionCardProps) => {
  return (
    <div
      className={`w-72 h-96 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <Link href='#' passHref>
        <a>
          <Image className='rounded-t-lg' src={imagePath} alt='' width={288} height={170} />
          <div className='p-5'>
            <h5 className='mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {title}
            </h5>
          </div>
        </a>
      </Link>
    </div>
  )
}
