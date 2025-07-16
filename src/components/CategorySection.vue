<script setup lang="ts">
import { ref } from 'vue'
import type { Booth } from '@/types/booth'
import BoothCard from '@/components/BoothCard.vue'

interface Props {
  category: string
  booths: Booth[]
  defaultCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
})

// 摺疊狀態
const isCollapsed = ref(props.defaultCollapsed)

// 切換摺疊狀態
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div>
    <!-- Category Header -->
    <button
      @click="toggleCollapse"
      class="flex w-full cursor-pointer items-center justify-between rounded-lg p-3 text-left transition-colors"
    >
      <div class="flex items-center">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ category }}
        </h2>
        <span
          class="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100"
        >
          {{ booths.length }}
        </span>
      </div>

      <!-- 摺疊圖示 -->
      <svg
        :class="{ 'rotate-180': isCollapsed }"
        class="h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Category Booth Grid with Transition -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div
        v-show="!isCollapsed"
        class="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <BoothCard v-for="booth in booths" :key="booth.id" :booth="booth" />
      </div>
    </Transition>
  </div>
</template>
