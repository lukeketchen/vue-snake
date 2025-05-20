<script setup lang="ts">
import { ref, onMounted } from 'vue'

const count = ref(3)

onMounted(() => {
  const timer = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
})
</script>

<template>
  <div class="flex items-center justify-center h-full w-full bg-black/70">
    <div 
      class="text-9xl font-bold text-white animate-pulse"
      v-if="count > 0"
    >
      {{ count }}
    </div>
  </div>
</template> 