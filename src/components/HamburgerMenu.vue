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
      class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      aria-label="開啟選單"
      @click="toggleMenu()"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      class="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      @click.stop
    >
      <div class="py-1">
        <!-- Theme Toggle Option -->
        <button
          type="button"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          @click="handleThemeToggle"
        >
          <svg class="w-4 h-4 !mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="themeIcon" />
          </svg>
          {{ themeText }}
        </button>
      </div>
    </div>
  </div>
</template>
