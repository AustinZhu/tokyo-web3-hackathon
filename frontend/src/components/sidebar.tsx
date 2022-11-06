import { Sidebar } from 'flowbite-react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { programState } from 'src/hooks/use-program'
import { CollectionIcon } from 'src/icons/sidebar/collection'
import { RevokeIcon } from 'src/icons/sidebar/revoke'
import { SettingsIcon } from 'src/icons/sidebar/settings'
import { SouldropIcon } from 'src/icons/sidebar/souldrop'
import { Program } from 'src/types/token'

export interface SidebarProps {
  programs: Program[]
  show?: boolean
  className?: string
}

export const SidebarMenu = ({ show = true, programs, className }: SidebarProps) => {
  const [currentProgram, setCurrentProgram] = useRecoilState(programState)

  const programsList = () => {
    return (
      <Sidebar.Collapse label={currentProgram?.name ?? programs[0]?.name ?? 'Select the Program'}>
        {programs.map((program) => (
          <Sidebar.Item key={program.addr} onClick={() => setCurrentProgram(program)}>
            {program.name}
          </Sidebar.Item>
        ))}
        <Link href='/program' passHref>
          <Sidebar.Item icon={SettingsIcon}>Create Program</Sidebar.Item>
        </Link>
      </Sidebar.Collapse>
    )
  }

  return show ? (
    <Sidebar
      className={`h-full ${className}`}
      aria-label='Sidebar with multi-level dropdown example'
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {programsList()}
          <Link href='/collection' passHref>
            <Sidebar.Item icon={CollectionIcon}>Soulbound Collection</Sidebar.Item>
          </Link>
          <Link href='/souldrop' passHref>
            <Sidebar.Item icon={SouldropIcon}>Souldrop</Sidebar.Item>
          </Link>
          <Link href='/revoke' passHref>
            <Sidebar.Item icon={RevokeIcon} className='flex flex-row'>
              Revoke
            </Sidebar.Item>
          </Link>
          <Link href='/settings' passHref>
            <Sidebar.Item icon={SettingsIcon}>General Settings</Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  ) : (
    <></>
  )
}
