# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 項目概述
這是一個基於 Vue 3 + TypeScript + Vite 的現代前端項目，使用 pnpm 作為包管理器。

## 常用命令

### 開發相關
- `pnpm install` - 安裝依賴
- `pnpm dev` - 啟動開發伺服器 (支持熱重載)
- `pnpm build` - 構建生產版本 (包含類型檢查)
- `pnpm preview` - 預覽構建結果

### 代碼品質
- `pnpm type-check` - 運行 TypeScript 類型檢查
- `pnpm lint` - 運行 ESLint 並自動修復
- `pnpm format` - 使用 Prettier 格式化 src/ 目錄

### 構建相關
- `pnpm build-only` - 僅構建，不進行類型檢查

## 項目架構

### 核心技術棧
- **Vue 3**: 使用 Composition API 和 `<script setup>` 語法
- **TypeScript**: 完整類型支持
- **Vite**: 現代構建工具，支持 HMR
- **pnpm**: 包管理器

### 項目結構
```
src/
├── App.vue          # 根組件
├── main.ts          # 應用入口點
├── assets/          # 靜態資源 (CSS, 圖片等)
├── components/      # 可重用組件
│   ├── HelloWorld.vue
│   ├── TheWelcome.vue
│   └── icons/       # 圖標組件
└── ...
```

### 路徑別名
- `@` 指向 `src/` 目錄

## 開發規範

### 代碼風格
- 使用 ESLint + Prettier 進行代碼格式化
- Vue 3 Composition API 和 `<script setup>` 語法
- TypeScript 嚴格模式
- 單文件組件 (SFC) 格式

### 配置文件
- `vite.config.ts` - Vite 配置
- `eslint.config.ts` - ESLint 配置
- `tsconfig.json` - TypeScript 配置 (複合項目)
- `package.json` - 依賴和腳本管理

### IDE 建議
- VS Code + Volar 擴展 (需要禁用 Vetur)
- 支持 Vue 3 TypeScript 類型檢查

### 樣式設計
- 樣式使用tailwindcss 4.x

## 技術選擇

### 生態工具
- 優先使用vueuse

## 設計指南

### 暗色模式
- 提供全局暗色模式切換功能
- 使用 CSS 變量管理顏色主題
- 遵循系統預設暗色/亮色模式設定