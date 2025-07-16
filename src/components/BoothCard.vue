<script setup lang="ts">
import type { Booth } from '@/types/booth'

interface Props {
  booth: Booth
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
  >
    <div class="p-2 sm:p-4 flex flex-col gap-3">
      <div class="flex items-center mb-3 gap-3">
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
        >
          {{ booth.id }}
        </span>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ booth.name }}
        </h3>
      </div>

      <!-- Performers -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 !mb-1">藝人陣容：</h4>
        <div v-if="booth.performers.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="performer in booth.performers"
            :key="performer"
            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {{ performer }}
          </span>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-gray-400">尚未公布</div>
      </div>
    </div>
  </div>
</template>
