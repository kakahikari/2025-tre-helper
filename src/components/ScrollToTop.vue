<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-3 rounded-full shadow-lg dark:shadow-gray-800/50 transition-colors duration-200 z-50"
      aria-label="回到頂端"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </Transition>
</template>
