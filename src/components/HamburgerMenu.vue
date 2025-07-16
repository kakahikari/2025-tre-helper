<script setup lang="ts">
import { ref } from 'vue'
import { useToggle, onClickOutside } from '@vueuse/core'

const [isMenuOpen, toggleMenu] = useToggle(false)

// 點擊外部關閉選單
const menuRef = ref()
onClickOutside(menuRef, () => {
  if (isMenuOpen.value) {
    toggleMenu(false)
  }
})

const handleThemeToggle = () => {
  // 暫時只有點擊效果，不實作切換功能
  console.log('主題切換功能待實作')
  toggleMenu(false)
}
</script>

<template>
  <div ref="menuRef" class="relative">
    <!-- Hamburger Menu Button -->
    <button
      type="button"
      class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
      class="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
      @click.stop
    >
      <div class="py-1">
        <!-- Theme Toggle Option -->
        <button
          type="button"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          @click="handleThemeToggle"
        >
          <svg class="w-4 h-4 !mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          切換 亮/暗 模式
        </button>
      </div>
    </div>
  </div>
</template>
