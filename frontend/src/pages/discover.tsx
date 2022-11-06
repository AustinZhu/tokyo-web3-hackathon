import { PageHeading } from '@/components/page-heading'
import { ProgramCard } from '@/components/program-card'
import type { NextPage } from 'next'
import { useMounted } from 'src/hooks/use-mounted'
import { useAccount } from 'wagmi'
import { useProgram } from 'src/hooks/use-program'
import { useEffect, useState } from 'react'
import { Program } from 'src/types/token'
import { useUtilContracts } from 'src/hooks/use-contract'

const Discover: NextPage = () => {
  const hasMounted = useMounted()
  const { address } = useAccount()
  const { getAllPrograms } = useProgram()
  const { registry } = useUtilContracts()

  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await getAllPrograms()
      setPrograms(programs ?? [])
    }
    fetchPrograms()
  }, [registry])

  if (!hasMounted) {
    return null
  }

  return (
    <div className='flex flex-col container mx-auto py-5'>
      <PageHeading title='Discover' description='Explore soulbound programs.' />
      <div className='flex flex-row flex-wrap'>
        {programs?.map((program) => (
          <ProgramCard key={program.addr} program={program} active={address !== undefined} />
        ))}
      </div>
    </div>
  )
}

export default Discover
