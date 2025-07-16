<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  isMobile?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜尋攤位編號、名稱或藝人...',
  isMobile: false,
})

const emit = defineEmits<Emits>()

// 計算搜尋框的 placeholder
const searchPlaceholder = computed(() => {
  return props.isMobile ? '關鍵字' : props.placeholder
})

// 更新搜尋值
const updateSearchValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

// 清除搜尋
const clearSearch = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative w-auto">
    <input
      name="querytext"
      :value="modelValue"
      @input="updateSearchValue"
      type="text"
      :placeholder="searchPlaceholder"
      class="w-30 rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-8 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:w-80 sm:pr-12 sm:pl-10 sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    />

    <!-- 搜尋圖示 -->
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

    <!-- 清除按鈕 -->
    <button
      v-if="modelValue.trim()"
      @click="clearSearch"
      class="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-700 sm:top-2.5 sm:right-3 sm:h-6 sm:w-6 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-gray-200"
      title="清除搜尋"
    >
      <svg class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>
