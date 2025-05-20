<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-gray-800 rounded-xl p-8 max-w-2xl w-full">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">How to Play</h2>
        <button 
          class="text-gray-400 hover:text-white transition"
          @click="$emit('close')"
        >
          <span class="material-icons">close</span>
        </button>
      </div>

      <div class="space-y-8">
        <!-- Keyboard Controls -->
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="material-icons">keyboard</span>
            Keyboard Controls
          </h3>
          <div class="grid grid-cols-2 gap-4 text-lg">
            <div>
              <p class="mb-2"><kbd class="bg-gray-700 px-2 py-1 rounded">↑</kbd> or <kbd class="bg-gray-700 px-2 py-1 rounded">W</kbd> - Move Up</p>
              <p class="mb-2"><kbd class="bg-gray-700 px-2 py-1 rounded">↓</kbd> or <kbd class="bg-gray-700 px-2 py-1 rounded">S</kbd> - Move Down</p>
              <p class="mb-2"><kbd class="bg-gray-700 px-2 py-1 rounded">←</kbd> or <kbd class="bg-gray-700 px-2 py-1 rounded">A</kbd> - Move Left</p>
              <p class="mb-2"><kbd class="bg-gray-700 px-2 py-1 rounded">→</kbd> or <kbd class="bg-gray-700 px-2 py-1 rounded">D</kbd> - Move Right</p>
            </div>
            <div>
              <p class="mb-2"><kbd class="bg-gray-700 px-2 py-1 rounded">P</kbd> or <kbd class="bg-gray-700 px-2 py-1 rounded">ESC</kbd> - Pause Game</p>
              <p class="mb-2"><kbd class="bg-gray-700 px-2 py-1 rounded">Enter</kbd> - Start/Resume Game</p>
            </div>
          </div>
        </div>

        <!-- Touch Controls -->
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="material-icons">touch_app</span>
            Touch Controls
          </h3>
          <div class="text-lg">
            <p class="mb-2">Swipe <span class="text-green-500">Up</span> to move up</p>
            <p class="mb-2">Swipe <span class="text-green-500">Down</span> to move down</p>
            <p class="mb-2">Swipe <span class="text-green-500">Left</span> to move left</p>
            <p class="mb-2">Swipe <span class="text-green-500">Right</span> to move right</p>
            <p class="mt-4 text-gray-400">* Tap the pause button to pause/resume the game</p>
          </div>
        </div>

        <!-- Game Rules -->
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="material-icons">rule</span>
            Game Rules
          </h3>
          <ul class="list-disc list-inside text-lg space-y-2">
            <li>Eat the red food to grow longer and score points</li>
            <li>Avoid hitting the walls</li>
            <li>Avoid running into yourself</li>
            <li>Score multiplier increases with difficulty level</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> 