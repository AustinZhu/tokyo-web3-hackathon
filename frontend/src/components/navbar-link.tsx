import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

interface NavbarLinkProps {
  href: string
  active?: boolean
}

export const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = (props) => {
  return (
    <li>
      <Link href={props.href}>
        <a
          className={
            props.active
              ? 'block py-2 pr-4 pl-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 dark:text-white'
              : 'block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
          }
          aria-current='page'
        >
          {props.children}
        </a>
      </Link>
    </li>
  )
}
