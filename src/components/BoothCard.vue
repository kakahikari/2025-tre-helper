<script setup lang="ts">
import { computed } from 'vue'
import type { Booth } from '@/types/booth'

interface Props {
  booth: Booth
}

const props = defineProps<Props>()

// 根據區域分類返回對應的顏色樣式
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
    A區: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      darkBg: 'dark:bg-red-900',
      darkText: 'dark:text-red-200',
    },
    B區: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      darkBg: 'dark:bg-green-900',
      darkText: 'dark:text-green-200',
    },
    C區: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      darkBg: 'dark:bg-yellow-900',
      darkText: 'dark:text-yellow-200',
    },
    D區: {
      bg: 'bg-pink-100',
      text: 'text-pink-800',
      darkBg: 'dark:bg-pink-900',
      darkText: 'dark:text-pink-200',
    },
    E區: {
      bg: 'bg-gray-800',
      text: 'text-white',
      darkBg: 'dark:bg-gray-600',
      darkText: 'dark:text-gray-100',
    },
    F區: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      darkBg: 'dark:bg-blue-900',
      darkText: 'dark:text-blue-200',
    },
    G區: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      darkBg: 'dark:bg-orange-900',
      darkText: 'dark:text-orange-200',
    },
    H區: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      darkBg: 'dark:bg-yellow-900/50',
      darkText: 'dark:text-yellow-100',
    },
    大會女優: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      darkBg: 'dark:bg-purple-900',
      darkText: 'dark:text-purple-200',
    },
  }

  return (
    colorMap[category] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      darkBg: 'dark:bg-gray-900',
      darkText: 'dark:text-gray-200',
    }
  )
}

// 計算攤位 ID 的顏色樣式
const idColorClasses = computed(() => {
  const colors = getCategoryColor(props.booth.category)
  return `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`
})

// 計算卡片背景顏色樣式
const cardBackgroundClasses = computed(() => {
  if (props.booth.name.includes('AV8D')) {
    return 'bg-pink-50 dark:bg-pink-950'
  }
  return 'bg-white dark:bg-gray-800'
})
</script>

<template>
  <div
    :class="`rounded-lg border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 ${cardBackgroundClasses}`"
  >
    <div class="flex flex-col gap-3 p-2 sm:p-4">
      <div class="flex items-center gap-3">
        <span
          :class="`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${idColorClasses}`"
        >
          {{ booth.id }}
        </span>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ booth.name }}
        </h3>
      </div>

      <!-- Performers -->
      <div class="space-y-2">
        <h4 class="!mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">藝人陣容：</h4>
        <div v-if="booth.performers.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="performer in booth.performers"
            :key="performer"
            class="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            <a
              :href="`https://jkface.net/find-face?search=${performer}`"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {{ performer }}
            </a>
          </span>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-gray-400">尚未公布</div>
      </div>
    </div>
  </div>
</template>
