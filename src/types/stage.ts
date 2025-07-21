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

export type StageName = 'main' | 'av-event' | 'av-plus' | 'jvid'
export type EventDate = '8/8' | '8/9' | '8/10'

export const STAGE_NAMES: Record<StageName, string> = {
  'main': '主舞台',
  'av-event': 'AV event舞台',
  'av-plus': 'AV+舞台',
  'jvid': 'JVID舞台'
}

export const EVENT_DATES: EventDate[] = ['8/8', '8/9', '8/10']