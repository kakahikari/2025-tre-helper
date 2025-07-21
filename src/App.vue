<script setup lang="ts">
import { computed, ref, watch, onMounted, provide } from 'vue'
import { useDark, useToggle, useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useRoute } from 'vue-router'
import HamburgerMenu from '@/components/HamburgerMenu.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import SearchBox from '@/components/SearchBox.vue'

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

const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')

// 根據當前路由計算頁面標題
const pageTitle = computed(() => {
  switch (route.name) {
    case 'stage-schedule':
      return '舞台時刻表'
    default:
      return '2025 TRE 攤位搜尋'
  }
})

// 搜尋功能（只在首頁使用）
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

// 判斷是否顯示搜尋框
const showSearchBox = computed(() => {
  return route.name === 'home'
})

// 提供搜尋查詢給子組件
provide('searchQuery', searchQuery)
</script>

<template>
  <div class="flex min-h-screen justify-center bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto w-full max-w-7xl">
      <!-- Header -->
      <header
        class="sticky top-0 z-40 border-b bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="px-2 lg:px-4">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center space-x-3">
              <HamburgerMenu :toggle-theme="toggleDark" :is-dark="isDark" />
              <h1 class="font-semibold text-gray-900 lg:text-xl dark:text-white">
                {{ pageTitle }}
              </h1>
            </div>
            <div v-if="showSearchBox" class="flex max-w-xs flex-1 justify-end sm:max-w-lg">
              <SearchBox
                v-model="searchQuery"
                :is-mobile="isMobile"
                placeholder="搜尋攤位編號、名稱或藝人..."
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Router View -->
      <RouterView />

      <!-- Footer -->
      <footer class="mt-8 py-6">
        <div class="px-2 lg:px-4">
          <div class="text-center">
            <p class="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
              <img src="./assets/logo.webp" alt="logo" class="mr-1 h-[1.5rem]" />
              <span>© 2025 <a href="https://github.com/kakahikari/">kakahikari</a></span>
            </p>
          </div>
        </div>
      </footer>

      <!-- Scroll to Top Component -->
      <ScrollToTop />
    </div>
  </div>
</template>
