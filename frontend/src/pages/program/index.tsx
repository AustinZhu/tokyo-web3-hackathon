import { Button } from '@/components/atom/button'
import { FileUpload } from '@/components/forms/fileUpload'
import { InputText } from '@/components/forms/inputText'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { programState, useProgram } from 'src/hooks/use-program'

interface ProgramForms {
  program: string
  cover: FileList
}

const ProgramPage = () => {
  const { register, handleSubmit } = useForm<ProgramForms>()
  const { ref: programRef, ...programRestProps } = register('program')
  const { ref: coverRef, ...coverRestProps } = register('cover')
  const { deployProxy } = useProgram()
  const [, setCurrentProgram] = useRecoilState(programState)

  const onSubmit: SubmitHandler<ProgramForms> = async (data) => {
    const programAddr = await deployProxy(data.program, data.cover[0])
    if (programAddr) {
      setCurrentProgram({
        addr: programAddr,
        name: data.program,
        image: '',
      })
    }
  }

  return (
    <>
      <h1 className='font-bold text-2xl mb-6'>Create Soulbound Program</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          id='program-name'
          label='Program Name'
          required
          wrapperClassName='w-1/3 mb-6'
          ref={programRef}
          {...programRestProps}
        />
        <FileUpload
          id='cover'
          label='Cover'
          wrapperClassName='w-1/3 mb-6'
          type='file'
          ref={coverRef}
          required
          {...coverRestProps}
        />
        <Button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          type='submit'
        >
          Create
        </Button>
      </form>
    </>
  )
}

export default ProgramPage
