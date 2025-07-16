<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBreakpoints, breakpointsTailwind, useDark, useToggle } from '@vueuse/core'
import type { Booth } from '@/types/booth'
import boothsData from '@/data/booths.json'
import HamburgerMenu from '@/components/HamburgerMenu.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import CategorySection from '@/components/CategorySection.vue'

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

// 按分類分組搜尋結果
const boothsByCategory = computed(() => {
  const grouped: Record<string, Booth[]> = {}

  filteredBooths.value.forEach(booth => {
    if (!grouped[booth.category]) {
      grouped[booth.category] = []
    }
    grouped[booth.category].push(booth)
  })

  // 按分類名稱排序
  return Object.keys(grouped)
    .sort()
    .reduce((sorted: Record<string, Booth[]>, key) => {
      sorted[key] = grouped[key]
      return sorted
    }, {})
})
</script>

<template>
  <div class="flex min-h-screen justify-center bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto w-full max-w-7xl">
      <!-- Header with Search -->
      <header
        class="sticky top-0 z-40 border-b bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="px-2 lg:px-4">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center space-x-3">
              <HamburgerMenu :toggle-theme="toggleDark" :is-dark="isDark" />
              <h1 class="font-semibold text-gray-900 lg:text-xl dark:text-white">
                2025 TRE 攤位搜尋
              </h1>
            </div>
            <div class="mr-4 ml-2 flex max-w-xs flex-1 justify-end sm:mx-8 sm:max-w-lg">
              <div class="relative w-auto">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="searchPlaceholder"
                  class="w-30 rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-8 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:w-80 sm:pl-10 sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <svg
                  class="absolute top-2.5 left-2 h-4 w-4 text-gray-400 sm:left-3 sm:h-5 sm:w-5 dark:text-gray-300"
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
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            找到 {{ filteredBooths.length }} 個攤位
            <span v-if="searchQuery.trim()" class="ml-2"> 搜尋「{{ searchQuery }}」 </span>
          </p>
        </div>

        <!-- Category Sections -->
        <CategorySection
          v-for="(categoryBooths, category) in boothsByCategory"
          :key="category"
          :category="category"
          :booths="categoryBooths"
        />

        <!-- No Results -->
        <div v-if="filteredBooths.length === 0" class="py-12 text-center">
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">找不到符合的攤位</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">請嘗試其他搜尋關鍵字</p>
        </div>
      </main>

      <!-- Scroll to Top Component -->
      <ScrollToTop />
    </div>
  </div>
</template>
