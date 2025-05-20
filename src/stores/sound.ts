import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'

interface Sound {
  name: string
  audio: HTMLAudioElement
}

interface SoundState {
  sounds: Record<string, Sound>
  backgroundMusic: HTMLAudioElement | null
  isMusicPlaying: boolean
}

export const useSoundStore = defineStore('sound', {
  state: (): SoundState => ({
    sounds: {},
    backgroundMusic: null,
    isMusicPlaying: false
  }),

  actions: {
    initializeSounds() {
      // Clean up any existing sounds
      this.cleanup()

      // Game sounds
      this.sounds = {
        eat: {
          name: 'eat',
          audio: new Audio('/sounds/eat.mp3')
        },
        move: {
          name: 'move',
          audio: new Audio('/sounds/move.mp3')
        },
        start: {
          name: 'start',
          audio: new Audio('/sounds/start.mp3')
        }
      }

      // Background music
      this.backgroundMusic = new Audio('/sounds/background.mp3')
      if (this.backgroundMusic) {
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = 0.5
      }

      // Set initial volume based on settings
      this.updateVolume()
    },

    cleanup() {
      // Stop and cleanup all sounds
      Object.values(this.sounds).forEach((sound: Sound) => {
        sound.audio.pause()
        sound.audio.currentTime = 0
      })
      
      // Stop background music
      if (this.backgroundMusic) {
        this.backgroundMusic.pause()
        this.backgroundMusic.currentTime = 0
      }
      
      this.sounds = {}
      this.backgroundMusic = null
      this.isMusicPlaying = false
    },

    playSound(soundName: string) {
      const settingsStore = useSettingsStore()
      if (!settingsStore.settings.soundEnabled) return

      const sound = this.sounds[soundName]
      if (sound) {
        // Clone the audio to allow multiple simultaneous plays
        const audioClone = sound.audio.cloneNode() as HTMLAudioElement
        audioClone.play().catch(error => {
          console.warn(`Failed to play sound ${soundName}:`, error)
        })
      }
    },

    startBackgroundMusic() {
      const settingsStore = useSettingsStore()
      if (!settingsStore.settings.soundEnabled || !this.backgroundMusic) return

      // Reset and start background music
      this.backgroundMusic.currentTime = 0
      this.backgroundMusic.play().catch(error => {
        console.warn('Failed to play background music:', error)
      })
      this.isMusicPlaying = true
    },

    stopBackgroundMusic() {
      if (this.backgroundMusic) {
        this.backgroundMusic.pause()
        this.backgroundMusic.currentTime = 0
        this.isMusicPlaying = false
      }
    },

    updateVolume() {
      const settingsStore = useSettingsStore()
      const volume = settingsStore.settings.soundEnabled ? 1 : 0

      // Update all sound effects
      Object.values(this.sounds).forEach((sound: Sound) => {
        sound.audio.volume = volume
      })

      // Update background music
      if (this.backgroundMusic) {
        if (!settingsStore.settings.soundEnabled && this.isMusicPlaying) {
          this.stopBackgroundMusic()
        }
        this.backgroundMusic.volume = volume * 0.5 // Background music at 50% volume
      }
    }
  }
}) 