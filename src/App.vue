<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useBreakpoints, breakpointsTailwind, useDark, useToggle } from '@vueuse/core'
import type { Booth } from '@/types/booth'
import boothsData from '@/data/booths.json'
import HamburgerMenu from '@/components/HamburgerMenu.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import CategorySection from '@/components/CategorySection.vue'
import SearchBox from '@/components/SearchBox.vue'

const booths = ref<Booth[]>(boothsData)
const searchQuery = ref('')

// 從 URL query 讀取搜尋關鍵字
const getSearchQueryFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('search') || ''
}

// 更新 URL query
const updateUrlQuery = (query: string) => {
  const url = new URL(window.location.href)
  if (query.trim()) {
    url.searchParams.set('search', query)
  } else {
    url.searchParams.delete('search')
  }
  window.history.replaceState({}, '', url.toString())
}

// 初始化時從 URL 讀取搜尋關鍵字
onMounted(() => {
  const urlQuery = getSearchQueryFromUrl()
  if (urlQuery) {
    searchQuery.value = urlQuery
  }
})

// 監聽搜尋關鍵字變更，更新 URL
watch(searchQuery, newQuery => {
  updateUrlQuery(newQuery)
})

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
            <div class="flex max-w-xs flex-1 justify-end sm:mx-8 sm:max-w-lg">
              <SearchBox
                v-model="searchQuery"
                :is-mobile="isMobile"
                placeholder="搜尋攤位編號、名稱或藝人..."
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-2 pb-12 sm:p-4 sm:pb-12">
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
