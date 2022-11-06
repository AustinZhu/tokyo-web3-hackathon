import { Button } from '@/components/atom/button'
import { Steps } from '@/components/block/steps'
import { FileUpload } from '@/components/forms/fileUpload'
import { FormCard } from '@/components/forms/formCard'
import { InputText } from '@/components/forms/inputText'
import { TextArea } from '@/components/forms/textArea'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { useCollection } from 'src/hooks/use-collection'
import { programState } from 'src/hooks/use-program'

interface CollectionForms {
  title: string
  cover: FileList
  description?: string
  fungible1Name: string
  fungible1Description: string
  fungible1Value: number
  fungible2Name: string
  fungible2Description: string
  fungible2Value: number
  nonFungibleName: string
  nonFungibleImage: FileList
}

const CreateCollectionsPage = () => {
  const [page, setPage] = useState<number>(1)

  const { register, handleSubmit } = useForm<CollectionForms>()
  const { ref: titleRef, ...titleRestProps } = register('title')
  const { ref: coverRef, ...coverRestProps } = register('cover')
  const { ref: descriptionRef, ...descriptionRestProps } = register('description')
  const { ref: fungible1NameRef, ...fungible1NameRestProps } = register('fungible1Name')
  const { ref: fungible1DescriptionRef, ...fungible1DescriptionRestProps } =
    register('fungible1Description')
  const { ref: fungible1ValueRef, ...fungible1ValueRestProps } = register('fungible1Value')
  const { ref: fungible2NameRef, ...fungible2NameRestProps } = register('fungible2Name')
  const { ref: fungible2DescriptionRef, ...fungible2DescriptionRestProps } =
    register('fungible2Description')
  const { ref: fungible2ValueRef, ...fungible2ValueRestProps } = register('fungible2Value')
  const { ref: nonFungibleNameRef, ...nonFungibleNameRestProps } = register('nonFungibleName')
  const { ref: nonFungibleImageRef, ...nonFungibleImageRestProps } = register('nonFungibleImage')

  const [currentProgram] = useRecoilState(programState)
  const { getCollections, createCollection } = useCollection(currentProgram?.addr)

  const onSubmit: SubmitHandler<CollectionForms> = async (data) => {
    const collections = await getCollections()
    await createCollection({
      slot: collections.length,
      name: data.title,
      description: data.description ?? '',
      image: data.cover[0],
      tokens: [
        {
          name: data.fungible1Name,
          description: data.fungible1Description,
          value: data.fungible1Value,
          type: 'fungible',
        },
        {
          name: data.fungible2Name,
          description: data.fungible2Description,
          value: data.fungible2Value,
          type: 'fungible',
        },
        {
          name: data.nonFungibleName,
          description: '',
          value: 1,
          image: data.nonFungibleImage[0],
          type: 'non-fungible',
        },
      ],
    })
  }

  const titleDummy: string[] = ['Set Up', 'Slots']

  const page1 = () => (
    <>
      <h1 className='font-bold text-2xl mb-6'>Create SBT Collection</h1>
      <Steps current={1} titles={titleDummy} className='mb-6' />
      <InputText
        label='Title'
        wrapperClassName='w-1/3 mb-6'
        required
        ref={titleRef}
        {...titleRestProps}
      />
      <FileUpload
        label='Cover'
        wrapperClassName='w-1/3 mb-6 h-44'
        required
        ref={coverRef}
        {...coverRestProps}
      />
      <TextArea
        label='Description'
        wrapperClassName='w-1/3 mb-6'
        required
        rows={4}
        ref={descriptionRef}
        {...descriptionRestProps}
      />
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={() => setPage(2)}
      >
        Next Step
      </Button>
    </>
  )

  const page2 = () => (
    <>
      <h1 className='font-bold text-2xl mb-6'>Slots Setting</h1>
      <Steps current={2} titles={titleDummy} className='mb-6' />
      <h2 className='font-bold text-xl mb-6'>Fungible</h2>
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <FormCard>
          <InputText
            label='Name'
            wrapperClassName='mb-6'
            required
            ref={fungible1NameRef}
            {...fungible1NameRestProps}
          />
          <TextArea
            label='Description'
            wrapperClassName='mb-6'
            rows={4}
            ref={fungible1DescriptionRef}
            {...fungible1DescriptionRestProps}
          />
          <InputText
            label='Initial Value'
            wrapperClassName='mb-6'
            ref={fungible1ValueRef}
            {...fungible1ValueRestProps}
          />
        </FormCard>
        <FormCard>
          <InputText
            label='Name'
            wrapperClassName='mb-6'
            required
            ref={fungible2NameRef}
            {...fungible2NameRestProps}
          />
          <TextArea
            label='Description'
            wrapperClassName='mb-6'
            rows={4}
            ref={fungible2DescriptionRef}
            {...fungible2DescriptionRestProps}
          />
          <InputText
            label='Initial Value'
            wrapperClassName='mb-6'
            ref={fungible2ValueRef}
            {...fungible2ValueRestProps}
          />
        </FormCard>
      </div>
      <h2 className='font-bold text-xl mb-6'>Non-Fungible</h2>
      <FormCard className='mb-6'>
        <InputText
          label='Name'
          wrapperClassName='mb-6'
          required
          ref={nonFungibleNameRef}
          {...nonFungibleNameRestProps}
        />
        <FileUpload
          label='Image'
          wrapperClassName='mb-6 h-44'
          required
          ref={nonFungibleImageRef}
          {...nonFungibleImageRestProps}
        />
      </FormCard>
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={() => setPage(1)}
      >
        Back
      </Button>
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type='submit'
      >
        Create Collection
      </Button>
    </>
  )

  const pages: { [key: number]: ReactNode } = {
    1: page1(),
    2: page2(),
  }

  return <form onSubmit={handleSubmit(onSubmit)}>{pages[page]}</form>
}

export default CreateCollectionsPage
