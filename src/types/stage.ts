export interface StageEvent {
  id: string
  time: string
  event: string
}

export interface StageSchedule {
  stage: string
  date: string
  events: StageEvent[]
}

export type StageName = 'main' | 'av-event' | 'av-plus' | 'jkf' | 'jvid'

export const STAGE_NAMES: Record<StageName, string> = {
  main: '主舞台',
  'av-event': 'AV EVENT舞台',
  'av-plus': 'AV+舞台',
  jkf: 'JKF舞台',
  jvid: 'JVID舞台',
}

export const EVENT_DATES = ['8/8', '8/9', '8/10'] as const
export type EventDate = (typeof EVENT_DATES)[number]
