# Copilot 使用說明（針對 thomascsd-blog）

以下說明幫助 AI 編碼代理快速在此專案中產出實用變更。請以可執行、最小變更為優先，並以現有檔案與約定為準。

- **專案類型與重點**: 這是使用 Analog (AnalogJS) 的 Angular 全端部落格樣板（參考 `package.json` 與 `README.md`）。前端使用 Vite，SSR 由 `main.server.ts`（匯出 `render`）處理；客戶端入口為 `main.ts`。

- **啟動 / 建置 / 偵錯**:
  - **安裝**: `npm install`。
  - **開發伺服器**: `npm start` (等於 `vite`)，預設埠 `5173`。
  - **建置**: `npm run build`。產物目錄參考 `README.md`：`dist/analog/public`（client），`dist/analog/server`（server）。
  - **預覽已建置的 SSR**: `npm run preview` （會啟動 `dist/analog/server/index.mjs`）。
  - **測試**: `npm run test`（使用 Vitest）。
  - **環境**: `package.json` 指定 Node >= `20.19.1`，TypeScript ~5.9。

- **主要目錄與檔案（快速導覽）**:
  - `src/main.ts` — 客戶端 bootstrap。
  - `src/main.server.ts` — SSR `render` 匯出，供伺服端運行。
  - `src/app/` — Angular 應用程式元件與路由。`src/app/app.ts` 為 root 組件。
  - `src/app/pages/` — 檔案路由（file-based routing）。動態路由範例: `src/app/pages/blog/[slug].page.ts`。
  - `src/server/routes/` — 伺服器端 API 路由（H3 `defineEventHandler`）；例如 `src/server/routes/api/v1/hello.ts`。
  - `content/` — Markdown 內容（`@analogjs/content` 已在 `app.config.ts` 註冊），示例：`content/example-post.md`。

- **程式庫與運作方式**:
  - 路由：採用 `provideFileRouter()` 與 `src/app/pages` 的檔案路由慣例。
  - 內容：`provideContent()` 與 Markdown renderer + Prism highlighter（`app.config.ts`）。將 Markdown 放到 `content/` 即可被內容系統擷取。
  - HTTP：使用 `provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor]))`，請在新增跨域或攔截器邏輯時遵循此模式。

- **修改範例（快速上手）**:
  - 新增靜態頁面：在 `src/app/pages/` 新增 `about.page.ts`，回傳 `RouteMeta` 或 Angular 組件與 template。
  - 新增部落格內容：在 `content/` 新增 `my-post.md`（前置欄位/FrontMatter 支援），並在 `src/app/pages/blog/[slug].page.ts` 讀取此內容。
  - 新增 API 路由：在 `src/server/routes/api/` 新增檔案，回傳 `defineEventHandler` 的 handler（同 `hello.ts` 範例）。

- **程式碼風格與框架慣例**:
  - 使用 Angular 的 standalone bootstrap (`bootstrapApplication`) 與 `ApplicationConfig` providers；新增 providers 時以 `app.config.ts` / `app.config.server.ts` 為範本。
  - 儘量保持最小變更：優先修改單一檔案或新增檔案，避免跨多模組的大幅重構。

- **測試/CI 建議（可被複製的步驟）**:
  - 單元測試：`npm run test`（Vitest）。編寫測試時參考現有 `src/app/app.spec.ts`。
  - 針對 SSR 變更，先 `npm run build` 再 `npm run preview` 驗證 server-side render 行為。

- **不可見的假設 / 注意事項**:
  - Node 版本限制（見 `package.json.engines`），請確保 CI 與本地環境相符。
  - Vite 插件 `vite-tsconfig-paths` 已加入，請維持 `tsconfig` 路徑一致性。

- **風格指南**: 請遵循 TypeScript 與 Angular 最佳實踐指南（見 `.github/instructions/angular-bestpractice.instructions.md`）。

- **其他資源**:
  - Analog 官方文件: https://analogjs.org/docs
  - Angular 官方文件: https://angular.io/docs
  - Vite 官方文件: https://vitejs.dev/guide/
  - Vitest 官方文件: https://vitest.dev/guide/

- 建立 Angular component 時，html 模板與 css 樣式請盡量內聯（inline），除非內容過長或需要特殊處理，才使用外部檔案。
