<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'tre-2026-redirect-dismissed'
const visible = ref(false)

onMounted(() => {
  if (!sessionStorage.getItem(STORAGE_KEY)) {
    visible.value = true
  }
})

function goTo2026() {
  sessionStorage.setItem(STORAGE_KEY, '1')
  visible.value = false
  window.open('https://kakahikari.me/2026-tre-helper/', '_blank', 'noopener,noreferrer')
}

function dismiss() {
  sessionStorage.setItem(STORAGE_KEY, '1')
  visible.value = false
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      @click.self="dismiss"
    >
      <div
        class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <!-- Icon -->
        <div class="mb-4 flex justify-center">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40"
          >
            <svg
              class="h-6 w-6 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <h2
          id="modal-title"
          class="mb-2 text-center text-lg font-semibold text-gray-900 dark:text-white"
        >
          您正在瀏覽 2025 年資料
        </h2>
        <p class="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
          目前已有 2026 TRE 資訊，是否前往 2026 年頁面？
        </p>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            class="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            @click="dismiss"
          >
            留在此頁
          </button>
          <button
            class="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600"
            @click="goTo2026"
          >
            前往 2026 ↗
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
