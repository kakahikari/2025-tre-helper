export interface Booth {
  id: string // 攤位編號，如 A01, B02
  name: string // 攤位名稱
  performers: string[] // 攤位陣容，轉換為陣列方便查詢
}

export interface BoothSearchOptions {
  id?: string
  name?: string
  performer?: string
}