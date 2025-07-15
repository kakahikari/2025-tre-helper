# TRE Helper - 攤位搜尋系統

基於 Vue 3 + TypeScript + Vite 的攤位搜尋應用程式。

## 資料格式說明

### `src/data/booths.json` 資料結構

本專案使用 JSON 格式儲存攤位資料，基於 TypeScript 介面定義：

```typescript
interface Booth {
  id: string      // 攤位編號，如 "A01", "B02", "D-01"
  name: string    // 攤位名稱，如 "未來飛翔", "TVC"
  performers: string[]  // 演出者陣列，如 ["蓮實克蕾雅", "白崎水麗"]
}
```

### JSON 資料範例

```json
[
  {
    "id": "A01",
    "name": "未來飛翔",
    "performers": [
      "蓮實克蕾雅",
      "白崎水麗", 
      "滝川菫",
      "蘭蘭"
    ]
  },
  {
    "id": "A19",
    "name": "UR AV",
    "performers": []
  }
]
```
