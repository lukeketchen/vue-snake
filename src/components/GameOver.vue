<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHighScoresStore } from '@/stores/highScores'
import { useSettingsStore } from '@/stores/settings'
import { useTheme } from '@/composables/useTheme'

const props = defineProps<{
  score: number
}>()

const emit = defineEmits<{
  (e: 'return-to-menu'): void
}>()

const { getClass } = useTheme()
const highScoresStore = useHighScoresStore()
const settingsStore = useSettingsStore()
const playerName = ref('')
const hasSubmitted = ref(false)

const handleSubmit = () => {
  if (playerName.value.trim()) {
    highScoresStore.addScore(
      props.score,
      playerName.value.trim(),
      settingsStore.settings.difficulty
    )
    hasSubmitted.value = true
    // Return to menu after a short delay
    setTimeout(() => {
      emit('return-to-menu')
    }, 1500)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !hasSubmitted.value && playerName.value.trim()) {
    handleSubmit()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <h1 :class="[getClass('text'), 'text-6xl font-bold mb-8']">Game Over!</h1>
    <p :class="[getClass('text'), 'text-4xl mb-8']">Score: {{ score }}</p>

    <!-- High Score Form -->
    <div v-if="!hasSubmitted" class="flex flex-col items-center gap-4">
      <p :class="[getClass('text'), 'text-xl']">Enter your name to save your score:</p>
      <div class="flex gap-4">
        <input
          v-model="playerName"
          type="text"
          placeholder="Enter your name"
          class="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64 text-lg"
          @keyup.enter="handleSubmit"
          autofocus
        >
        <button 
          :class="[getClass('primary'), 'px-4 py-2 rounded-lg transition text-lg']"
          :disabled="!playerName.trim()"
          @click="handleSubmit"
        >
          Submit
        </button>
      </div>
    </div>

    <!-- Success Message -->
    <div v-else class="text-center">
      <p :class="[getClass('text'), 'text-2xl mb-4']">
        Score saved! Returning to menu...
      </p>
    </div>
  </div>
</template> 