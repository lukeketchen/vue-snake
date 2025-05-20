<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainMenu from './components/MainMenu.vue'
import GameBoard from './components/GameBoard.vue'
import GameOver from './components/GameOver.vue'
import CountDown from './components/CountDown.vue'
import Settings from './components/Settings.vue'
import HighScores from './components/HighScores.vue'
import HowToPlay from './components/HowToPlay.vue'
import { useSettingsStore } from './stores/settings'
import { useHighScoresStore } from './stores/highScores'
import { useSoundStore } from './stores/sound'

// Game states
const isPlaying = ref(false)
const isGameOver = ref(false)
const showCountDown = ref(false)
const showSettings = ref(false)
const showHighScores = ref(false)
const showHowToPlay = ref(false)
const score = ref(0)

// Initialize stores
const settingsStore = useSettingsStore()
const highScoresStore = useHighScoresStore()
const soundStore = useSoundStore()

onMounted(() => {
  settingsStore.loadSettings()
  highScoresStore.loadScores()
  soundStore.initializeSounds()
})

// Handle starting the game
const startGame = () => {
  showCountDown.value = true
  soundStore.playSound('start')
  setTimeout(() => {
    showCountDown.value = false
    isPlaying.value = true
  }, 3000) // 3 second countdown
}

// Handle game over
const handleGameOver = (finalScore: number) => {
  score.value = finalScore
  isPlaying.value = false
  isGameOver.value = true
}

// Handle returning to menu
const returnToMenu = () => {
  isGameOver.value = false
  isPlaying.value = false
}

// Handle opening settings
const openSettings = () => {
  showSettings.value = true
}

// Handle closing settings
const closeSettings = () => {
  showSettings.value = false
}

// Handle opening high scores
const openHighScores = () => {
  showHighScores.value = true
}

// Handle closing high scores
const closeHighScores = () => {
  showHighScores.value = false
}

// Handle opening how to play
const openHowToPlay = () => {
  showHowToPlay.value = true
}

// Handle closing how to play
const closeHowToPlay = () => {
  showHowToPlay.value = false
}
</script>

<template>
  <main class="h-full w-full bg-gray-900 text-white">
    <!-- Main Menu -->
    <MainMenu 
      v-if="!isPlaying && !isGameOver && !showCountDown"
      @play="startGame"
      @settings="openSettings"
      @high-scores="openHighScores"
      @how-to-play="openHowToPlay"
    />

    <!-- Countdown -->
    <CountDown 
      v-if="showCountDown"
      class="absolute inset-0 z-50"
    />

    <!-- Game Board -->
    <GameBoard
      v-if="isPlaying"
      @game-over="handleGameOver"
      @settings="openSettings"
    />

    <!-- Game Over -->
    <GameOver
      v-if="isGameOver"
      :score="score"
      @return-to-menu="returnToMenu"
      class="absolute inset-0 z-40 bg-black/50"
    />

    <!-- Settings Modal -->
    <Settings
      v-if="showSettings"
      @close="closeSettings"
    />

    <!-- High Scores Modal -->
    <HighScores
      v-if="showHighScores"
      @close="closeHighScores"
    />

    <!-- How to Play Modal -->
    <HowToPlay
      v-if="showHowToPlay"
      @close="closeHowToPlay"
    />
  </main>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
