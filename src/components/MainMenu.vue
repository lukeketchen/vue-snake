<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// Emits: play, settings, high-scores, how-to-play
const emit = defineEmits<{
  (e: 'play'): void
  (e: 'settings'): void
  (e: 'high-scores'): void
  (e: 'how-to-play'): void
}>()

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    emit('play')
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
    <div class="mb-12 text-center">
      <div class="snake-pixel mb-4"></div>
      <h1 class="text-7xl font-bold text-green-500 pixel-font">SNAKE</h1>
    </div>
    
    <div class="flex flex-col gap-4">
      <button 
        class="bg-green-500 text-white text-3xl font-bold rounded-xl px-12 py-6 shadow-lg hover:bg-green-600 transition"
        @click="$emit('play')"
      >
        PLAY
      </button>

      <button 
        class="bg-gray-700 text-white text-xl font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        @click="$emit('how-to-play')"
      >
        <span class="material-icons">help_outline</span>
        How to Play
      </button>

      <button 
        class="bg-gray-700 text-white text-xl font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        @click="$emit('settings')"
      >
        <span class="material-icons">settings</span>
        Settings
      </button>

      <button 
        class="bg-gray-700 text-white text-xl font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        @click="$emit('high-scores')"
      >
        <span class="material-icons">emoji_events</span>
        High Scores
      </button>
    </div>
  </div>
</template>

<style scoped>
.pixel-font {
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 0.1em;
  text-shadow: 
    2px 2px 0 #1b4332,
    4px 4px 0 #1b4332;
}

.snake-pixel {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  image-rendering: pixelated;
  background: linear-gradient(45deg,
    transparent 0%,
    transparent 40%,
    #22c55e 40%,
    #22c55e 60%,
    transparent 60%,
    transparent 100%
  );
}

.snake-pixel::before,
.snake-pixel::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #22c55e;
  border-radius: 50%;
  top: 50%;
}

.snake-pixel::before {
  left: 15px;
  transform: translateY(-50%);
  box-shadow: 0 -8px 0 0 #15803d;
}

.snake-pixel::after {
  right: 15px;
  transform: translateY(-50%);
  box-shadow: 0 -8px 0 0 #15803d;
}
</style> 