<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBreakpoints, breakpointsTailwind, useDark, useToggle } from '@vueuse/core'
import type { Booth } from '@/types/booth'
import boothsData from '@/data/booths.json'
import BoothCard from '@/components/BoothCard.vue'
import HamburgerMenu from '@/components/HamburgerMenu.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

const booths = ref<Booth[]>(boothsData)
const searchQuery = ref('')

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')

// 主題切換功能
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'vueuse-color-scheme',
  storage: localStorage,
})
const toggleDark = useToggle(isDark)

const searchPlaceholder = computed(() => {
  return isMobile.value ? '關鍵字' : '搜尋攤位編號、名稱或藝人...'
})

const filteredBooths = computed(() => {
  if (!searchQuery.value.trim()) {
    return booths.value
  }

  const query = searchQuery.value.toLowerCase().trim()

  return booths.value.filter(booth => {
    return (
      booth.id.toLowerCase().includes(query) ||
      booth.name.toLowerCase().includes(query) ||
      booth.performers.some(performer => performer.toLowerCase().includes(query))
    )
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Search -->
      <header class="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div class="px-2 lg:px-4">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center space-x-3">
              <HamburgerMenu :toggle-theme="toggleDark" :is-dark="isDark" />
              <h1 class="lg:text-xl font-semibold text-gray-900 dark:text-white">
                2025 TRE 攤位搜尋
              </h1>
            </div>
            <div class="flex-1 max-w-xs sm:max-w-lg ml-2 mr-4 sm:mx-8 flex justify-end">
              <div class="relative w-auto">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="searchPlaceholder"
                  class="w-30 sm:w-80 pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <svg
                  class="absolute left-2 sm:left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-2 sm:p-4">
        <!-- Search Results Info -->
        <div class="mb-6">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            找到 {{ filteredBooths.length }} 個攤位
            <span v-if="searchQuery.trim()" class="ml-2"> 搜尋「{{ searchQuery }}」 </span>
          </p>
        </div>

        <!-- Booth Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <BoothCard v-for="booth in filteredBooths" :key="booth.id" :booth="booth" />
        </div>

        <!-- No Results -->
        <div v-if="filteredBooths.length === 0" class="text-center py-12">
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">找不到符合的攤位</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">請嘗試其他搜尋關鍵字</p>
        </div>
      </main>

      <!-- Scroll to Top Component -->
      <ScrollToTop />
    </div>
  </div>
</template>
