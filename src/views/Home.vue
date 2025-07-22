<script setup lang="ts">
defineOptions({
  name: 'HomePage',
})
import { ref, computed, inject, type Ref } from 'vue'
import type { Booth } from '@/types/booth'
import boothsData from '@/data/booths.json'
import CategorySection from '@/components/CategorySection.vue'

const booths = ref<Booth[]>(boothsData)

// 從父組件注入搜尋查詢
const searchQuery = inject<Ref<string>>('searchQuery')!

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
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto w-full max-w-7xl">
      <!-- Main Content -->
      <main class="p-2 sm:p-4">
        <!-- Search Results Info -->
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            找到 {{ filteredBooths.length }} 個攤位
            <span v-if="searchQuery.trim()" class="ml-2">
              搜尋「<span translate="no">{{ searchQuery }}</span
              >」
            </span>
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
    </div>
  </div>
</template>
