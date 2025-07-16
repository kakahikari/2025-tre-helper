<script setup lang="ts">
import type { Booth } from '@/types/booth'

interface Props {
  booth: Booth
}

defineProps<Props>()
</script>

<template>
  <div
    class="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex flex-col gap-3 p-2 sm:p-4">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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
            {{ performer }}
          </span>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-gray-400">尚未公布</div>
      </div>
    </div>
  </div>
</template>
