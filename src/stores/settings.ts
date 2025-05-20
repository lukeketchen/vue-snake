import { defineStore } from 'pinia'

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard'
  soundEnabled: boolean
  theme: 'classic' | 'dark' | 'neon'
}

interface SettingsState {
  settings: GameSettings
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: {
      difficulty: 'medium',
      soundEnabled: true,
      theme: 'classic'
    }
  }),

  getters: {
    getDifficultyMultiplier(): number {
      const multipliers = {
        easy: 1,
        medium: 1.5,
        hard: 2
      }
      return multipliers[this.settings.difficulty]
    },
    
    getGameSpeed(): number {
      const speeds = {
        easy: 150,
        medium: 120,
        hard: 90
      }
      return speeds[this.settings.difficulty]
    }
  },

  actions: {
    setDifficulty(difficulty: GameSettings['difficulty']) {
      this.settings.difficulty = difficulty
    },

    setSoundEnabled(enabled: boolean) {
      this.settings.soundEnabled = enabled
    },

    setTheme(theme: GameSettings['theme']) {
      this.settings.theme = theme
    },

    // Load settings from localStorage
    loadSettings() {
      const savedSettings = localStorage.getItem('snake-game-settings')
      if (savedSettings) {
        this.settings = JSON.parse(savedSettings)
      }
    },

    // Save settings to localStorage
    saveSettings() {
      localStorage.setItem('snake-game-settings', JSON.stringify(this.settings))
    }
  }
}) 