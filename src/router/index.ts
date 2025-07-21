import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import StageSchedule from '@/views/StageSchedule.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/stage-schedule',
      name: 'stage-schedule',
      component: StageSchedule,
    },
  ],
})

export default router
