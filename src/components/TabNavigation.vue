<script setup lang="ts" generic="T extends string">
interface Props {
  tabs: Record<T, string>
  activeTab: T
  tabOrder: T[]
}

interface Emits {
  (e: 'update:activeTab', tab: T): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <nav class="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
      <button
        v-for="tab in tabOrder"
        :key="tab"
        type="button"
        :class="[
          'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors',
          activeTab === tab
            ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
        ]"
        @click="$emit('update:activeTab', tab)"
      >
        {{ tabs[tab] }}
      </button>
    </nav>
  </div>
</template>