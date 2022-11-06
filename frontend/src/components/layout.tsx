import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useUtilContracts } from 'src/hooks/use-contract'
import { programState, useProgram } from 'src/hooks/use-program'
import { Program } from 'src/types/token'
import { Navbar } from './navbar'
import { SidebarMenu } from './sidebar'

export default function Layout({ children }: { children: ReactElement }) {
  const router = useRouter()

  const { getMyPrograms } = useProgram()
  const [, setCurrentProgram] = useRecoilState(programState)
  const [programs, setPrograms] = useState<Program[]>([])
  const { deployer, registry } = useUtilContracts()

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await getMyPrograms()
      setPrograms(programs)
      setCurrentProgram(programs[0])
      console.log(programs)
    }
    fetchPrograms()
  }, [deployer, registry])

  const showSidebarPaths = [
    '/welcome',
    '/program',
    '/souldrop',
    '/collection',
    '/collection/create',
    '/revoke',
    '/settings',
  ]

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='flex flex-row h-full'>
        <SidebarMenu show={showSidebarPaths.includes(router.pathname)} programs={programs} />
        <div className='p-8 w-full'>{children}</div>
      </main>
    </div>
  )
}
