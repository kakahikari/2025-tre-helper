<script setup lang="ts" generic="T extends string">
interface Props {
  tags: Record<T, string>
  activeTag: T
  tagOrder: T[]
  label: string
}

interface Emits {
  (e: 'update:activeTag', tag: T): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="mb-2">
    <label class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>
    <div class="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="tag in tagOrder"
        :key="tag"
        type="button"
        :class="[
          'inline-flex flex-shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
          activeTag === tag
            ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
        ]"
        @click="$emit('update:activeTag', tag)"
      >
        {{ tags[tag] }}
      </button>
    </div>
  </div>
</template>
