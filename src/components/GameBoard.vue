<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useTheme } from '@/composables/useTheme'
import { useSoundStore } from '@/stores/sound'

const gameStore = useGameStore()
const { getClass } = useTheme()
const soundStore = useSoundStore()
const gameLoop = ref<ReturnType<typeof setInterval> | null>(null)
const touchStart = ref<{ x: number; y: number } | null>(null)
const MIN_SWIPE_DISTANCE = 30 // minimum distance for swipe detection

// Handle keyboard input
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      gameStore.setDirection('up')
      break
    case 'ArrowDown':
    case 's':
      gameStore.setDirection('down')
      break
    case 'ArrowLeft':
    case 'a':
      gameStore.setDirection('left')
      break
    case 'ArrowRight':
    case 'd':
      gameStore.setDirection('right')
      break
    case 'p':
    case 'Escape':
      gameStore.togglePause()
      if (gameStore.isPaused) {
        soundStore.stopBackgroundMusic()
      } else {
        soundStore.startBackgroundMusic()
      }
      break
  }
}

// Handle touch start
const handleTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0]
  touchStart.value = {
    x: touch.clientX,
    y: touch.clientY
  }
}

// Handle touch end
const handleTouchEnd = (event: TouchEvent) => {
  if (!touchStart.value) return

  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStart.value.x
  const deltaY = touch.clientY - touchStart.value.y

  // Determine if the swipe was primarily horizontal or vertical
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) >= MIN_SWIPE_DISTANCE) {
      if (deltaX > 0) {
        gameStore.setDirection('right')
      } else {
        gameStore.setDirection('left')
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) >= MIN_SWIPE_DISTANCE) {
      if (deltaY > 0) {
        gameStore.setDirection('down')
      } else {
        gameStore.setDirection('up')
      }
    }
  }

  touchStart.value = null
}

// Start game loop
const startGameLoop = () => {
  if (gameLoop.value) return
  
  gameStore.resetGame()
  soundStore.startBackgroundMusic()
  gameLoop.value = setInterval(() => {
    const didEat = gameStore.moveSnake()
    if (didEat) {
      soundStore.playSound('eat')
    } else if (!gameStore.isPaused) {
      soundStore.playSound('move')
    }
    
    if (gameStore.isGameOver) {
      soundStore.stopBackgroundMusic()
      stopGameLoop()
      emit('game-over', gameStore.score)
    }
  }, gameStore.gameSpeed)
}

// Stop game loop
const stopGameLoop = () => {
  if (gameLoop.value) {
    clearInterval(gameLoop.value)
    gameLoop.value = null
  }
}

// Initialize on component mount
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  soundStore.initializeSounds()
  startGameLoop()
})

// Cleanup on component unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopGameLoop()
  soundStore.stopBackgroundMusic()
})

// Emits: game-over
const emit = defineEmits<{
  (e: 'game-over', score: number): void
}>()
</script>

<template>
  <div 
    :class="[getClass('background'), 'relative h-full w-full flex items-center justify-center p-4']"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Score and Controls -->
    <div class="absolute top-4 right-4 flex items-center gap-4">
      <div :class="[getClass('text'), 'text-2xl font-bold']">
        Score: {{ gameStore.score }}
      </div>
      <button 
        :class="[getClass('secondary'), 'px-4 py-2 rounded-lg transition flex items-center gap-2']"
        @click="() => {
          gameStore.togglePause();
          if (gameStore.isPaused) {
            soundStore.stopBackgroundMusic();
          } else {
            soundStore.startBackgroundMusic();
          }
        }"
      >
        <span class="material-icons">{{ gameStore.isPaused ? 'play_arrow' : 'pause' }}</span>
        {{ gameStore.isPaused ? 'Resume' : 'Pause' }}
      </button>
    </div>
    
    <!-- Game grid -->
    <div 
      :class="[getClass('surface'), 'grid gap-1 p-4 rounded-lg']"
      :style="{
        'grid-template-columns': `repeat(${gameStore.GRID_SIZE}, minmax(0, 1fr))`,
        'aspect-ratio': '1 / 1',
        'width': '90vmin'
      }"
    >
      <template v-for="(row, i) in gameStore.gridState" :key="i">
        <div
          v-for="(cell, j) in row"
          :key="`${i}-${j}`"
          class="aspect-square rounded-sm transition-colors duration-100"
          :class="{
            [getClass('grid')]: cell === 0,  // Empty cell
            [getClass('snake')]: cell === 1, // Snake
            [getClass('food')]: cell === 2   // Food
          }"
        />
      </template>
    </div>

    <!-- Pause Overlay -->
    <div 
      v-if="gameStore.isPaused"
      class="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
    >
      <div class="text-center">
        <h2 :class="[getClass('text'), 'text-6xl font-bold mb-4']">PAUSED</h2>
        <p :class="[getClass('text'), 'text-xl mb-8']">Press P or ESC to resume</p>
        <button 
          :class="[getClass('primary'), 'text-2xl font-bold rounded-xl px-8 py-4 shadow-lg transition']"
          @click="gameStore.togglePause"
        >
          Resume Game
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 4px;
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