<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Booth } from '@/types/booth'
import boothsData from '@/data/booths.json'
import BoothCard from '@/components/BoothCard.vue'

const booths = ref<Booth[]>(boothsData)
const searchQuery = ref('')

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
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header with Search -->
      <header class="bg-white shadow-sm border-b">
        <div class="sm:px-2 lg:px-4">
          <div class="flex items-center justify-between h-16">
            <h1 class="text-xl font-semibold text-gray-900">2025 TRE 攤位搜尋</h1>
            <div class="flex-1 max-w-lg mx-8">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜尋攤位編號、名稱或藝人..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <svg
                  class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
      <main class="sm:px-2 lg:px-4 py-8">
        <!-- Search Results Info -->
        <div class="mb-6">
          <p class="text-sm text-gray-600">
            找到 {{ filteredBooths.length }} 個攤位
            <span v-if="searchQuery.trim()" class="ml-2"> 搜尋「{{ searchQuery }}」 </span>
          </p>
        </div>

        <!-- Booth Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BoothCard v-for="booth in filteredBooths" :key="booth.id" :booth="booth" />
        </div>

        <!-- No Results -->
        <div v-if="filteredBooths.length === 0" class="text-center py-12">
          <h3 class="mt-2 text-sm font-medium text-gray-900">找不到符合的攤位</h3>
          <p class="mt-1 text-sm text-gray-500">請嘗試其他搜尋關鍵字</p>
        </div>
      </main>
    </div>
  </div>
</template>
