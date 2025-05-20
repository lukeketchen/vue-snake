<script setup lang="ts">
import { useHighScoresStore } from '@/stores/highScores'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits(['close'])
const { getClass } = useTheme()
const highScoresStore = useHighScoresStore()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDifficulty = (difficulty: string) => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 :class="[getClass('text'), 'text-2xl font-bold']">High Scores</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition"
        >
          <span class="material-icons">close</span>
        </button>
      </div>

      <!-- Scores Table -->
      <div class="bg-gray-900 rounded-lg p-4">
        <div v-if="highScoresStore.getAllScores.length > 0">
          <div class="grid grid-cols-5 gap-4 mb-2 text-gray-400 text-sm font-medium">
            <div>Rank</div>
            <div>Name</div>
            <div>Score</div>
            <div>Difficulty</div>
            <div>Date</div>
          </div>
          <div class="space-y-2">
            <div
              v-for="(score, index) in highScoresStore.getAllScores"
              :key="index"
              class="grid grid-cols-5 gap-4 items-center py-2"
              :class="[getClass('text')]"
            >
              <div class="font-mono">#{{ index + 1 }}</div>
              <div class="font-medium">{{ score.name }}</div>
              <div class="font-mono">{{ score.score }}</div>
              <div>
                <span 
                  class="px-2 py-1 rounded text-sm"
                  :class="{
                    'bg-green-500/20 text-green-300': score.difficulty === 'easy',
                    'bg-yellow-500/20 text-yellow-300': score.difficulty === 'medium',
                    'bg-red-500/20 text-red-300': score.difficulty === 'hard'
                  }"
                >
                  {{ formatDifficulty(score.difficulty) }}
                </span>
              </div>
              <div class="text-sm text-gray-400">{{ formatDate(score.date) }}</div>
            </div>
          </div>
        </div>
        <div 
          v-else 
          class="text-center py-8"
        >
          <p :class="[getClass('text'), 'text-lg mb-2']">No high scores yet</p>
          <p class="text-gray-400">Play a game to set a high score!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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