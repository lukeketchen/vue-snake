<script setup lang="ts">
import { useSettingsStore, type GameSettings } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { useSoundStore } from '@/stores/sound'

const settingsStore = useSettingsStore()
const soundStore = useSoundStore()
const { settings } = storeToRefs(settingsStore)

const difficulties: GameSettings['difficulty'][] = ['easy', 'medium', 'hard']
const themes: GameSettings['theme'][] = ['classic', 'dark', 'neon']

const setDifficulty = (difficulty: GameSettings['difficulty']) => {
  settingsStore.setDifficulty(difficulty)
  settingsStore.saveSettings()
}

const toggleSound = () => {
  settingsStore.setSoundEnabled(!settings.value.soundEnabled)
  settingsStore.saveSettings()
  soundStore.updateVolume()
  
  // Play a test sound when enabling
  if (settings.value.soundEnabled) {
    soundStore.playSound('start')
  }
}

const setTheme = (theme: GameSettings['theme']) => {
  settingsStore.setTheme(theme)
  settingsStore.saveSettings()
}

defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="settings-container p-6 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Settings</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
      
      <!-- Difficulty Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">Difficulty</h3>
        <div class="flex gap-4">
          <button
            v-for="level in difficulties"
            :key="level"
            @click="setDifficulty(level)"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              settings.difficulty === level
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            {{ level.charAt(0).toUpperCase() + level.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Sound Toggle -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">Sound</h3>
        <button
          @click="toggleSound"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors w-32',
            settings.soundEnabled
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300'
          ]"
        >
          {{ settings.soundEnabled ? 'Enabled' : 'Disabled' }}
        </button>
      </div>

      <!-- Theme Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">Theme</h3>
        <div class="flex gap-4">
          <button
            v-for="theme in themes"
            :key="theme"
            @click="setTheme(theme)"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              settings.theme === theme
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Save & Close
      </button>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  min-width: 320px;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
</style> 