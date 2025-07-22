# TRE Helper - 攤位搜尋系統

基於 Vue 3 + TypeScript + Vite 的攤位搜尋應用程式。

## 資料格式說明

### `src/data/booths.json` 資料結構

本專案使用 JSON 格式儲存攤位資料，基於 TypeScript 介面定義：

```typescript
interface Booth {
  id: string // 攤位編號，如 "A01", "B02", "D-01"
  name: string // 攤位名稱，如 "未來飛翔", "TVC"
  category: string // 攤位分類，如 "A區", "B區", "大會女優"
  performers: string[] // 演出者陣列，如 ["蓮實克蕾雅", "白崎水麗"]
}
```

### JSON 資料範例

```json
[
  {
    "id": "A01",
    "name": "未來飛翔",
    "category": "A區",
    "performers": ["蓮實克蕾雅", "白崎水麗", "滝川菫", "蘭蘭"]
  },
  {
    "id": "A19",
    "name": "UR AV",
    "category": "A區",
    "performers": []
  }
]
```

### `src/data/stage-schedule.json` 資料結構

此檔案儲存各個舞台的時程表資料，按舞台類型和日期組織：

```typescript
interface ScheduleEvent {
  id: string // 事件唯一識別碼，如 "main-0808-1"
  time: string // 時間範圍，如 "09:50-10:40" 或單一時間 "11:00"
  event: string // 事件名稱，如 "櫻空桃 白金女優High Five會"
}

interface StageSchedule {
  [stageName: string]: {
    [date: string]: ScheduleEvent[]
  }
}
```

### JSON 資料範例

```json
{
  "main": {
    "8/8": [
      {
        "id": "main-0808-1",
        "time": "09:50-10:40",
        "event": "TRE女優出場"
      },
      {
        "id": "main-0808-2",
        "time": "11:00-11:25",
        "event": "櫻空桃 白金女優High Five會"
      }
    ]
  },
  "jvid": {
    "8/8": [
      {
        "id": "jvid-0808-1",
        "time": "11:00",
        "event": "官攤model開場表演"
      }
    ]
  }
}
```
