import { useSettingsStore } from '@/stores/settings'
import { computed } from 'vue'

type ThemeElement = 'background' | 'surface' | 'grid' | 'snake' | 'food' | 'text' | 'primary' | 'secondary'

interface ThemeConfig {
  background: string
  surface: string
  grid: string
  snake: string
  food: string
  text: string
  primary: string
  secondary: string
}

const themes: Record<'classic' | 'dark' | 'neon', ThemeConfig> = {
  classic: {
    background: 'bg-gray-900',
    surface: 'bg-gray-800',
    grid: 'bg-gray-700',
    snake: 'bg-green-500',
    food: 'bg-red-500',
    text: 'text-white',
    primary: 'bg-green-500 hover:bg-green-600',
    secondary: 'bg-gray-700 hover:bg-gray-600'
  },
  dark: {
    background: 'bg-black',
    surface: 'bg-gray-900',
    grid: 'bg-gray-800',
    snake: 'bg-blue-500',
    food: 'bg-purple-500',
    text: 'text-gray-200',
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-800 hover:bg-gray-700'
  },
  neon: {
    background: 'bg-purple-900',
    surface: 'bg-purple-800',
    grid: 'bg-purple-700',
    snake: 'bg-green-400',
    food: 'bg-pink-400',
    text: 'text-green-300',
    primary: 'bg-green-400 hover:bg-green-500',
    secondary: 'bg-purple-700 hover:bg-purple-600'
  }
}

export function useTheme() {
  const settingsStore = useSettingsStore()

  const currentTheme = computed(() => themes[settingsStore.settings.theme])

  const getClass = (element: ThemeElement) => {
    return currentTheme.value[element]
  }

  return {
    getClass
  }
} 