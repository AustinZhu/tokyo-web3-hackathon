import { Badge } from '@/components/atom/badge'
import { Button } from '@/components/atom/button'
import { Steps } from '@/components/block/steps'
import { FileUpload } from '@/components/forms/fileUpload'
import { InputText } from '@/components/forms/inputText'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { programState } from 'src/hooks/use-program'
import { useSouldrop } from 'src/hooks/use-souldrop'

interface SouldropForms {
  memberPointValue?: string
  nftImage: FileList
}

const SouldropPage = () => {
  const [page, setPage] = useState<number>(1)
  const [currentProgram] = useRecoilState(programState)

  const { register, handleSubmit, watch } = useForm<SouldropForms>()
  const { ref: memberPointValueRef, ...memberPointValueRestProps } = register('memberPointValue')
  const { ref: nftImageRef, ...nftImageRestProps } = register('nftImage')

  const { souldrop } = useSouldrop(currentProgram?.addr)

  const onSubmit: SubmitHandler<SouldropForms> = async (data) => {
    console.log(data)
    const nftAddr = await souldrop(Number(data.memberPointValue ?? '0'), data.nftImage[0])
    console.log(nftAddr)
  }

  const titleDummy: string[] = ['Eligibility', 'Reward', 'Complete']

  const page1 = () => (
    <>
      <h2 className='font-bold text-xl mb-6'>Eligibility</h2>
      <div className='mb-6'>
        <Badge>By Balance</Badge>
      </div>
      <div className='mb-6'>
        <Badge>Fungible</Badge>
      </div>
      <div className='mb-6'>
        <div className='mb-4'>
          <Badge>Member Point</Badge>
        </div>
        <InputText
          label='Value'
          leftText='Over'
          wrapperClassName='w-1/3 mb-6'
          required
          ref={memberPointValueRef}
          {...memberPointValueRestProps}
        />
      </div>
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        disabled={watch('memberPointValue')?.length === 0}
        onClick={() => setPage(2)}
      >
        Next Step
      </Button>
    </>
  )

  const page2 = () => (
    <>
      <h2 className='font-bold text-xl mb-6'>Network</h2>
      <div className='mb-6'>
        <Badge>Goerli</Badge>
      </div>
      <div className='mb-6'>
        <Badge>NFTs</Badge>
      </div>
      <FileUpload
        label='Image'
        wrapperClassName='w-1/3 mb-6 h-44'
        required
        ref={nftImageRef}
        {...nftImageRestProps}
      />
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={() => setPage(1)}
      >
        Back
      </Button>
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        disabled={!watch('nftImage') || watch('nftImage').length === 0}
        onClick={() => setPage(3)}
      >
        Next Step
      </Button>
    </>
  )

  const confirmationPage = () => {
    return (
      <>
        <h2 className='font-bold text-xl mb-6'>Eligibility</h2>
        <div className='mb-6'>
          <Badge>By Balance</Badge>
        </div>
        <div className='mb-6'>
          <Badge>Fungible</Badge>
        </div>
        <div className='mb-6'>
          <div className='mb-4'>
            <Badge>Member Point</Badge>
          </div>
          <InputText
            label='Value'
            leftText='Over'
            wrapperClassName='w-1/3 mb-6'
            required
            value={watch('memberPointValue')}
            readOnly
          />
        </div>
        <h2 className='font-bold text-xl mb-6'>Network</h2>
        <div className='mb-6'>
          <Badge>Goerli</Badge>
        </div>
        <div className='mb-6'>
          <Badge>NFTs</Badge>
        </div>
        <div className='mb-6'>
          <h3 className='text-sm mb-2'>
            NFT Image<span className='text-red-500'>*</span>
          </h3>
          <Image src='/images/sample-collection.jpg' width={288} height={170} />
        </div>
        <Button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={() => setPage(2)}
        >
          Back
        </Button>
        <Button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={() => setPage(3)}
        >
          Souldrop
        </Button>
      </>
    )
  }

  const pages: { [key: number]: ReactNode } = {
    1: page1(),
    2: page2(),
    3: confirmationPage(),
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='font-bold text-2xl mb-6'>Souldrop</h1>
      <Steps current={page} titles={titleDummy} className='mb-6' />
      {pages[page]}
    </form>
  )
}

export default SouldropPage
