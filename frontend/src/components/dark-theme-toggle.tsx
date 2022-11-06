import { useTheme } from 'next-themes'
import { ComponentProps, FC } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'

export type DarkThemeToggleProps = Omit<ComponentProps<'button'>, 'className'>

export const DarkThemeToggle: FC<DarkThemeToggleProps> = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      type='button'
      aria-label='Toggle dark mode'
      className='text-white'
    >
      {theme === 'dark' ? (
        <HiSun size='24' color='#FFCC80' aria-label='Currently dark mode' />
      ) : (
        <HiMoon size='24' color='#90CAF9' aria-label='Currently light mode' />
      )}
    </button>
  )
}
