interface ThemeColors {
  background: string
  surface: string
  primary: string
  secondary: string
  accent: string
  text: string
  food: string
  snake: string
  grid: string
}

export type ThemeName = 'classic' | 'dark' | 'neon'

const themes: Record<ThemeName, ThemeColors> = {
  classic: {
    background: 'bg-gray-900',
    surface: 'bg-gray-800',
    primary: 'bg-green-500 hover:bg-green-600',
    secondary: 'bg-gray-700 hover:bg-gray-600',
    accent: 'bg-red-500',
    text: 'text-white',
    food: 'bg-red-500',
    snake: 'bg-green-500',
    grid: 'bg-gray-800'
  },
  dark: {
    background: 'bg-black',
    surface: 'bg-gray-900',
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-800 hover:bg-gray-700',
    accent: 'bg-purple-500',
    text: 'text-gray-100',
    food: 'bg-purple-500',
    snake: 'bg-blue-500',
    grid: 'bg-gray-900'
  },
  neon: {
    background: 'bg-violet-950',
    surface: 'bg-violet-900',
    primary: 'bg-pink-600 hover:bg-pink-700',
    secondary: 'bg-violet-800 hover:bg-violet-700',
    accent: 'bg-yellow-400',
    text: 'text-pink-100',
    food: 'bg-yellow-400',
    snake: 'bg-pink-500',
    grid: 'bg-violet-900'
  }
}

// Helper function to get theme classes
export const getThemeClasses = (themeName: ThemeName, element: keyof ThemeColors): string => {
  return themes[themeName][element]
}

// Get all classes for an element with hover states
export const getThemeClass = (themeName: ThemeName, element: keyof ThemeColors, includeHover = true): string => {
  const classes = themes[themeName][element].split(' ')
  return includeHover ? classes.join(' ') : classes[0]
}

export default themes 