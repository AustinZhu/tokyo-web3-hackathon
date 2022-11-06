import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
// import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useMounted } from 'src/hooks/use-mounted'
import { DarkThemeToggle } from './dark-theme-toggle'
import { NavbarLink } from './navbar-link'
import { SoularisLogo } from './soularis-logo'

export const Navbar: FC = () => {
  const hasMounted = useMounted()
  // const { theme } = useTheme()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    {
      title: 'Discover',
      href: '/discover',
    },
    {
      title: 'Launchpad',
      href: '/welcome',
    },
    {
      title: 'Inventory',
      href: '/inventory',
    },
    {
      title: 'Benefits',
      href: '/benefits',
    },
  ]

  if (!hasMounted) {
    return null
  }

  return (
    <header className='flex-initial px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link href='/'>
          <a className='flex items-center'>
            <div className='flex items-center w-10 md:w-40 gap-3'>
              <SoularisLogo />
            </div>
          </a>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='flex md:order-2 gap-4'>
          <ConnectButton />
          <DarkThemeToggle />
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:w-auto w-full md:order-1`}
          id='navbar-sticky'
        >
          <ul className='flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700'>
            {links.map((link) => (
              <NavbarLink key={link.title} href={link.href} active={router.asPath === link.href}>
                {link.title}
              </NavbarLink>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
