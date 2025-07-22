<script setup lang="ts">
defineOptions({
  name: 'StageSchedulePage',
})
import { ref, computed, watch, onMounted } from 'vue'
import TagSelector from '@/components/TagSelector.vue'
import type { StageName, EventDate, StageEvent } from '@/types/stage'
import { STAGE_NAMES, EVENT_DATES } from '@/types/stage'
import stageScheduleData from '@/data/stage-schedule.json'

// 當前選擇的舞台和日期
const activeStage = ref<StageName>('main')
const activeDate = ref<EventDate>('8/8')

// 從 URL query 讀取參數
const getStageFromUrl = (): StageName => {
  const urlParams = new URLSearchParams(window.location.search)
  const stage = urlParams.get('stage') as StageName
  return STAGE_NAMES[stage] ? stage : 'main'
}

const getDateFromUrl = (): EventDate => {
  const urlParams = new URLSearchParams(window.location.search)
  const date = urlParams.get('date') as EventDate
  return EVENT_DATES.includes(date) ? date : '8/8'
}

// 更新 URL query
const updateUrlQuery = () => {
  const url = new URL(window.location.href)
  url.searchParams.set('stage', activeStage.value)
  url.searchParams.set('date', activeDate.value)
  window.history.replaceState({}, '', url.toString())
}

// 初始化時從 URL 讀取參數
onMounted(() => {
  const urlStage = getStageFromUrl()
  const urlDate = getDateFromUrl()

  if (urlStage !== activeStage.value) {
    activeStage.value = urlStage
  }

  if (urlDate !== activeDate.value) {
    activeDate.value = urlDate
  }
})

// 監聽舞台和日期變更，更新 URL
watch([activeStage, activeDate], () => {
  updateUrlQuery()
})

// 從外部 JSON 文件導入舞台活動數據
const scheduleData = ref<Record<StageName, Record<EventDate, StageEvent[]>>>(stageScheduleData)

// 當前選擇的事件列表
const currentEvents = computed(() => {
  return scheduleData.value[activeStage.value]?.[activeDate.value] || []
})

// 舞台標籤順序
const stageOrder: StageName[] = ['main', 'av-event', 'av-plus', 'jkf', 'jvid']

// 日期標籤
const dateOptions: Record<EventDate, string> = {
  '8/8': '8/8 (五)',
  '8/9': '8/9 (六)',
  '8/10': '8/10 (日)',
}

// 時間標籤顏色映射
const timeTagColors: Record<EventDate, string> = {
  '8/8': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  '8/9': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  '8/10': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl p-2 sm:p-4">
      <!-- 篩選器 -->
      <div class="mb-2 rounded-lg bg-white p-2 shadow sm:mb-4 dark:bg-gray-800">
        <TagSelector
          v-model:active-tag="activeStage"
          :tags="STAGE_NAMES"
          :tag-order="stageOrder"
          label="舞台"
        />

        <TagSelector
          v-model:active-tag="activeDate"
          :tags="dateOptions"
          :tag-order="[...EVENT_DATES]"
          label="日期"
        />
      </div>

      <!-- 時刻表內容 -->
      <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        <div class="px-4 py-5 sm:p-6">
          <!-- 標題顯示當前選擇 -->
          <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ STAGE_NAMES[activeStage] }} - {{ dateOptions[activeDate] }}
            </h2>
          </div>

          <!-- 有活動時顯示列表 -->
          <div v-if="currentEvents.length > 0" class="space-y-4">
            <div
              v-for="event in currentEvents"
              :key="event.id"
              class="flex items-center rounded-lg border border-gray-200 p-2 transition-colors hover:bg-gray-50 sm:p-4 dark:border-gray-700 dark:hover:bg-gray-700/50"
            >
              <div class="flex-shrink-0">
                <div
                  :class="[
                    'rounded-md px-3 py-1.5 text-sm font-semibold',
                    timeTagColors[activeDate],
                  ]"
                >
                  {{ event.time }}
                </div>
              </div>
              <div class="ml-4 flex-1">
                <h3 class="text-base font-medium text-gray-900 dark:text-white" translate="no">
                  {{ event.event }}
                </h3>
              </div>
            </div>
          </div>

          <!-- 無活動時顯示提示 -->
          <div v-else class="py-12 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">尚無資料</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
