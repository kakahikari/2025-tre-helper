<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToggle, onClickOutside } from '@vueuse/core'

interface Props {
  toggleTheme: () => void
  isDark: boolean
}

const props = defineProps<Props>()

const [isMenuOpen, toggleMenu] = useToggle(false)

// 點擊外部關閉選單
const menuRef = ref()
onClickOutside(menuRef, () => {
  if (isMenuOpen.value) {
    toggleMenu(false)
  }
})

const handleThemeToggle = () => {
  props.toggleTheme()
  toggleMenu(false)
}

const openBoothMap = () => {
  window.open('https://face-resource.hare200.com/board/activity_179/detail/resize/95ea7a02-a0c4-4cf8-967e-14dc208ffda9-7311.jpeg', '_blank')
  toggleMenu(false)
}

const themeIcon = computed(() => {
  return props.isDark
    ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
})

const themeText = computed(() => {
  return props.isDark ? '切換到亮色模式' : '切換到暗色模式'
})
</script>

<template>
  <div ref="menuRef" class="relative">
    <!-- Hamburger Menu Button -->
    <button
      type="button"
      class="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
      aria-label="開啟選單"
      @click="toggleMenu()"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
      @click.stop
    >
      <div class="py-1">
        <!-- 攤位大圖選項 -->
        <button
          type="button"
          class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          @click="openBoothMap"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
          攤位大圖
        </button>
        
        <!-- Theme Toggle Option -->
        <button
          type="button"
          class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          @click="handleThemeToggle"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="themeIcon" />
          </svg>
          {{ themeText }}
        </button>
      </div>
    </div>
  </div>
</template>
