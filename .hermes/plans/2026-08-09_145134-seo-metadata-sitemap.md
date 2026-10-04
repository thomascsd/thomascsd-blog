# Thomas Blog 技術 SEO 調整計劃

> **For Hermes:** 使用 subagent-driven-development skill 逐項執行本計劃；每項任務完成後先驗證，再建立獨立 commit。

**Goal:** 在不改動既有文章 URL 的前提下，為 Thomas Blog 建立可由 SSR/SSG 輸出的動態頁面 metadata、canonical、社群分享標記、BlogPosting JSON-LD、robots.txt 與完整 sitemap.xml，並以實際 production build 與 HTML/XML/JSON 驗證結果完成交付。

**Architecture:** 沿用目前 Angular 21 + Analog 2.1.1 + Vite 的靜態預渲染架構。將頁面 SEO metadata 集中到共用的純資料模型與 SEO service/helper，由首頁、文章、About、Tags 頁提供各自資料；sitemap/robots 在 build 前由內容檔產生並放入 `public/`，讓 Analog 自動複製到部署輸出。所有絕對 URL 統一使用 `https://thomascsd.github.io` 與 trailing slash。

**Tech Stack:** Angular 21、Analog 2.1.1、Vite 7、TypeScript 5.9、Vitest、Node.js ESM、Markdown front matter。

---

## 目前程式庫確認結果

- Repository：`D:\projects\thomascsd-blog`
- Remote：`https://github.com/thomascsd/thomascsd-blog.git`
- 目前分支：`master`，已存在 `origin/master`
- 目前框架：Angular + Analog，`vite.config.ts` 啟用 `static: true` 及 prerender routes
- 內容來源：`src/content/*.md`
- 頁面：
  - 共用 layout：`src/app/layout.ts`
  - 首頁：`src/app/pages/home.page.ts`
  - 文章：`src/app/pages/blog/[slug].page.ts`
  - About：`src/app/pages/about.page.ts`
  - Tags index：`src/app/pages/tags/index.page.ts`
  - Tag detail：`src/app/pages/tags/[slug].page.ts`
- 現有 RSS：`src/server/routes/rss.xml.ts`，URL 為 `/api/rss.xml`
- 現有部署前處理：`deploy.mjs`
- 現有測試：`src/app/app.spec.ts`；Vitest 設定於 `vite.config.ts`
- `public/images/bgBlog.png` 已存在，可作為預設 OG/Twitter 圖片
- 目前 `vite.config.ts` 的 tag prerender transform 每個內容檔只回傳第一個 tag，需修正或改成共用的唯一 tag route 集合；不可只產生部分 tag 頁

## 共通規格與不變條件

1. 正式站根網址固定為 `https://thomascsd.github.io`。
2. 所有 canonical、OG URL、sitemap URL、RSS article URL 使用同一套 URL builder，路徑採 trailing slash。
3. 不修改現有文章 slug；任何新增 route 必須由實際 `src/content` 資料產生。
4. description 必須有 fallback，但不可把所有頁面填成同一段文章內容。
5. BlogPosting 的 headline、description、日期、作者、URL、圖片必須來自文章資料或明確且可驗證的 fallback。
6. 不把搜尋結果頁、空 tag 頁或純 UI route 放進 sitemap。
7. `.hermes/` 是本地計劃資料，不列入版本控制；若 repository 尚未忽略，先補上 `/.hermes/`。

## 執行前分支

```bash
cd /d/projects/thomascsd-blog
git status --short --branch
git switch -c seo/metadata-sitemap
```

若分支已存在，改用：

```bash
git switch seo/metadata-sitemap
git status --short --branch
```

若工作樹有非本任務變更，先停止並保留現況，不要重置或覆蓋使用者修改。

---

## Task 1: 建立 SEO 資料模型、URL builder 與共用純函式

**Objective:** 建立可被頁面、sitemap、測試共用的 SEO 基礎模組，先固定 URL、trailing slash、tag 顯示名稱、日期與 description fallback 規則。

**Files:**
- Create: `src/app/seo/seo-types.ts`
- Create: `src/app/seo/seo-utils.ts`
- Create: `src/app/seo/seo-utils.spec.ts`
- Modify: `src/app/post-attributes.ts`（補充可選的 `datePublished`、`dateModified`、`author`、`image` 等 front matter 欄位，保留目前欄位相容性）

**Step 1: 先寫 failing tests**

測試至少涵蓋：
- `absoluteUrl('/')`、`absoluteUrl('/about')`、文章與 tag 路徑都輸出唯一 trailing slash URL。
- 已有 trailing slash 不會變成雙 slash。
- `getPostDate` 優先使用明確 front matter 日期，否則從 `YYYY-MM-DD` slug/檔名取得。
- `getDescription` 對空白 description 有穩定 fallback，且不回傳空字串。
- tag label 對 `typescript`、`expressjs`、`dotnet`、`vscode`、`nodejs`、`vuejs` 使用交接事項要求的顯示名稱；未知 tag 仍可讀。

**Step 2: 執行測試確認 RED**

```bash
npm test -- --run src/app/seo/seo-utils.spec.ts
```

預期：測試因模組或函式尚未存在而失敗。

**Step 3: 實作最小純函式**

實作 `SITE_URL`、`DEFAULT_SOCIAL_IMAGE`、URL builder、文章日期/描述 fallback、tag display map 與 SEO 型別。不要在此階段修改頁面或產生檔案。

**Step 4: 執行測試確認 GREEN**

```bash
npm test -- --run src/app/seo/seo-utils.spec.ts
```

預期：所有 SEO utils 測試通過。

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
npm test -- --run src/app/seo/seo-utils.spec.ts
git add src/app/seo/seo-types.ts src/app/seo/seo-utils.ts src/app/seo/seo-utils.spec.ts src/app/post-attributes.ts
git status --short
git commit -m "feat: add shared SEO data and URL helpers"
git log --oneline -5
git status --short
```

預期：測試通過、commit 建立、最後工作樹乾淨。測試或型別檢查失敗時不可 commit。

---

## Task 2: 實作 SSR-safe 共用 metadata service

**Objective:** 讓所有 indexable 頁面能以同一套 API 寫入 title、description、canonical、Open Graph、Twitter Card，並正確清理舊 metadata。

**Files:**
- Create: `src/app/seo/seo.service.ts`
- Create: `src/app/seo/seo.service.spec.ts`
- Modify: `src/app/app.config.ts`（若 service 需要 provider，採 Angular injectable root，不新增不必要 provider）

**Step 1: 先寫 failing tests**

使用 Angular TestBed 驗證：
- 一般頁面 title、description、canonical、`og:title`、`og:description`、`og:url`、`og:type`、`og:image`、Twitter card/title/description/image 都能產生。
- 文章頁 `og:type` 為 `article`，可輸出 published/modified time 與 author。
- 重複呼叫 service 不會留下相同 property/name 的重複 meta tag。
- URL、description、attribute value 由 Angular DOM API 寫入，不直接拼接未 escape 的 HTML。

**Step 2: 確認 RED**

```bash
npm test -- --run src/app/seo/seo.service.spec.ts
```

預期：service 尚未存在或測試失敗。

**Step 3: 實作 service**

使用 Angular `Title`、`Meta`、`DOCUMENT` 等正式 API；定義清楚的 page input 與 article input。service 必須在 SSR 與瀏覽器 hydration 均可執行，不依賴 `window`、`location` 或瀏覽器-only API。

**Step 4: 確認 GREEN**

```bash
npm test -- --run src/app/seo/seo.service.spec.ts
```

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
npm test -- --run src/app/seo/seo.service.spec.ts
git add src/app/seo/seo.service.ts src/app/seo/seo.service.spec.ts src/app/app.config.ts
git status --short
git commit -m "feat: add SSR-safe page metadata service"
git log --oneline -5
git status --short
```

---

## Task 3: 套用首頁、About、Tags 與 Tag detail metadata

**Objective:** 為四類非文章頁加入符合交接事項的動態 title、description、canonical 與社群 metadata。

**Files:**
- Modify: `src/app/pages/home.page.ts`
- Modify: `src/app/pages/about.page.ts`
- Modify: `src/app/pages/tags/index.page.ts`
- Modify: `src/app/pages/tags/[slug].page.ts`
- Modify: `src/app/seo/seo-utils.spec.ts`（若需要補頁面資料規則測試）

**Step 1: 定義 page data 與測試案例**

至少驗證以下規則：
- 首頁：`Thomas Blog｜分享 Angular、TypeScript 與 Web 開發心得`，description 使用交接事項指定首頁描述。
- About：`關於 Thomas｜Thomas Blog`，description 描述 About 內容。
- Tags index：`Tags｜Thomas Blog`，description 描述可用標籤集合。
- Tag detail：`{標籤名稱} 文章｜Thomas Blog`，description 明確包含標籤名稱與文章列表語意；canonical 指向 `/tags/{slug}/`。

**Step 2: 實作最小整合**

在各頁以 constructor/field initialization 可安全取得的方式注入 service；Tag detail 必須在 route parameter 取得後設定 metadata。不要修改既有 router URL 或文章排序。

**Step 3: 本機測試**

```bash
npm test -- --run
npm run build
```

預期：既有測試與新增測試通過，production build 成功。

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
npm test -- --run
npm run build
git add src/app/pages/home.page.ts src/app/pages/about.page.ts src/app/pages/tags/index.page.ts 'src/app/pages/tags/[slug].page.ts' src/app/seo/seo-utils.spec.ts
git status --short
git commit -m "feat: add metadata for non-article pages"
git log --oneline -5
git status --short
```

---

## Task 4: 套用文章 metadata 與 BlogPosting JSON-LD

**Objective:** 讓每一篇文章輸出唯一 title、description、canonical、article social metadata 與有效的 BlogPosting JSON-LD。

**Files:**
- Modify: `src/app/pages/blog/[slug].page.ts`
- Create: `src/app/seo/structured-data.ts`
- Create: `src/app/seo/structured-data.spec.ts`
- Modify: `src/app/post-attributes.ts`（若 Task 1 未完成所有 optional 欄位）

**Step 1: 先寫 failing structured-data tests**

測試一筆代表性文章資料，驗證 JSON-LD 至少含：
- `@context: https://schema.org`
- `@type: BlogPosting`
- 實際 `headline`、`description`
- `datePublished`、`dateModified`
- `author`（`Person` 與 Thomas 名稱）
- `mainEntityOfPage.@id` 為文章 canonical
- `image` 使用文章圖片，無文章圖片時使用預設圖片

另測試缺少 optional date/image 時的 fallback，以及 JSON.stringify 後可被 `JSON.parse` 還原。

**Step 2: 確認 RED**

```bash
npm test -- --run src/app/seo/structured-data.spec.ts
```

**Step 3: 實作與整合**

以純函式建立 JSON-LD object，再由文章頁用 Angular `DOCUMENT`/Renderer 或安全的 script element API 插入 `script[type="application/ld+json"]`。文章資料由 `injectContent` observable 取得後，必須在 SSR 輸出的 HTML 中完成 metadata 與 JSON-LD；不可只在瀏覽器 `afterNextRender` 執行。文章 title 格式為 `{文章標題}｜Thomas Blog`。圖片優先使用 `bgImageUrl`，沒有時使用 `https://thomascsd.github.io/images/bgBlog.png`。

**Step 4: 確認 GREEN 與 build**

```bash
npm test -- --run src/app/seo/structured-data.spec.ts
npm run build
```

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
npm test -- --run src/app/seo/structured-data.spec.ts
npm run build
git add 'src/app/pages/blog/[slug].page.ts' src/app/seo/structured-data.ts src/app/seo/structured-data.spec.ts src/app/post-attributes.ts
git status --short
git commit -m "feat: add article SEO metadata and BlogPosting schema"
git log --oneline -5
git status --short
```

---

## Task 5: 產生 robots.txt、sitemap.xml 並修正 prerender routes

**Objective:** 從真實 Markdown 內容產生可部署的 robots/sitemap，包含所有有效文章與非空 tag route，並保留 RSS 正式 URL。

**Files:**
- Create: `scripts/generate-seo-assets.mjs`
- Create: `scripts/generate-seo-assets.spec.mjs` 或將純函式拆至可測試的 TypeScript/JS 模組
- Create: `public/robots.txt`
- Generated/modified: `public/sitemap.xml`（由 script 產生，禁止手工維護 URL 清單）
- Modify: `package.json`（新增 `prebuild` 或等價 build pipeline hook）
- Modify: `vite.config.ts`（以同一份內容/route 邏輯產生所有文章與唯一 tag prerender routes）
- Modify: `src/server/routes/rss.xml.ts`（確認文章 link/id 使用共用 trailing-slash 規則；若無法直接共用 Node/Angular 模組，保持等價實作並補測試）

**Step 1: 先寫 generator tests**

測試固定 fixture/content metadata，驗證：
- sitemap 含 `/`、`/about/`、`/tags/`、全部文章、所有至少一篇文章使用的 tag。
- URL 全部以 `https://thomascsd.github.io/` 開頭且 trailing slash 唯一。
- 不含 localhost、preview domain、重複 URL、空 tag、搜尋頁。
- 文章 `lastmod` 取 `dateModified`，無此欄位時取 `datePublished`，再無資料才從檔名日期取得；不可使用當下時間造成每次 build 漂移。
- robots 內容精確包含 `Allow: /` 與 sitemap URL。
- sitemap 可由 XML parser 解析。

**Step 2: 確認 RED**

```bash
node --test scripts/generate-seo-assets.spec.mjs
```

**Step 3: 實作 generator 與 build hook**

generator 讀取 `src/content/*.md` 的 front matter，依實際文章資料輸出 `public/robots.txt` 與 `public/sitemap.xml`。輸出前做排序、去重與 XML escaping。不要在 `deploy.mjs` 以 regex 修改 sitemap；sitemap 應在 production build 前就是正確內容。

修正 `vite.config.ts` 的 prerender route 來源：所有文章 route 與所有唯一、有實質內容的 tag route 都要被預渲染。若 Analog 的 route transform API 不支援單一 transform 回傳多 route，先依目前套件版本確認 API，再改用可被 Analog 支援的 route list 生成方式；不要保留「每篇文章只取第一個 tag」的行為。

**Step 4: 確認 GREEN、build 與 XML**

```bash
node --test scripts/generate-seo-assets.spec.mjs
npm run build
node -e "const fs=require('node:fs'); const s=fs.readFileSync('dist/analog/public/sitemap.xml','utf8'); if(!s.includes('<urlset')) process.exit(1); console.log('sitemap output present')"
```

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
node --test scripts/generate-seo-assets.spec.mjs
npm run build
git add scripts/generate-seo-assets.mjs scripts/generate-seo-assets.spec.mjs public/robots.txt public/sitemap.xml package.json vite.config.ts src/server/routes/rss.xml.ts
git status --short
git commit -m "feat: generate robots sitemap and complete prerender routes"
git log --oneline -5
git status --short
```

---

## Task 6: 補強語意 HTML、圖片與內容索引品質

**Objective:** 處理交接事項中的建議項目，避免 SEO metadata 完成但頁面語意或圖片可讀性仍有明顯問題。

**Files:**
- Modify: `src/app/pages/home.page.ts`
- Modify: `src/app/pages/blog/[slug].page.ts`
- Modify: `src/app/pages/tags/index.page.ts`
- Modify: `src/app/pages/tags/[slug].page.ts`
- Modify: `src/content/*.md`（只修改確實缺少或錯誤的 front matter/tag/圖片 alt，不批次改動文章 URL）

**檢查與實作規則：**
- 每個頁面保留一個主要 `h1`；首頁文章卡片維持 `h2`，文章章節由 Markdown renderer 產生的層級需檢查。
- 文章主圖 alt 使用描述性文字；純裝飾圖片使用空 alt；不要把所有圖片 alt 都簡化成相同文章 title。
- 統一 tag 顯示名稱，不任意改變 tag slug；若要 canonical 化 tag slug，需同步 route、連結、sitemap 並確認舊 URL。
- 首頁與 tag 頁的文章摘要要存在於 SSR HTML；不要新增只靠瀏覽器執行才出現的摘要。
- 只有內容確實相關時才加入延伸閱讀/內部連結，不製造關鍵字堆砌。
- RSS 保留 `/api/rss.xml`，確認文章 URL 使用正式 trailing-slash URL。

**驗證：**

```bash
npm test -- --run
npm run build
```

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
npm test -- --run
npm run build
git add src/app/pages/home.page.ts src/app/pages/blog/[slug].page.ts src/app/pages/tags/index.page.ts 'src/app/pages/tags/[slug].page.ts' src/content
git status --short
git commit -m "fix: improve semantic markup and content accessibility"
git log --oneline -5
git status --short
```

若 `src/content` 有大量與本任務無關的現有變更，改為只列出明確修改的 Markdown 檔案。

---

## Task 7: 建立本機 production 驗證腳本並完成驗收

**Objective:** 以 build 後的實際輸出驗證主要 route 的 HTTP、SSR HTML metadata、JSON-LD、sitemap 與 robots，形成可重複執行的交付證據。

**Files:**
- Create: `scripts/verify-seo.mjs`
- Create: `scripts/verify-seo.spec.mjs` 或加入 fixture-based unit tests
- Modify: `package.json`（新增 `verify:seo` 指令）
- Modify: `README.md`（記錄 install/build/test/verify 指令與部署前驗收流程）

**驗證流程：**

1. 執行 `npm install`（若 lockfile 與 node_modules 已可用，仍以 lockfile 驗證，不更新依賴）。
2. 執行 `npm test -- --run`。
3. 執行 `npm run build`。
4. 以 `npm run preview` 或等價 production server 啟動 `dist/analog`，等待 health check 成功。
5. 用 Node fetch/curl 讀取：`/`、`/about/`、`/tags/`、最新文章、`/robots.txt`、`/sitemap.xml`。
6. 驗證 HTTP 200、SSR HTML 中每頁唯一 title/description/canonical/OG/Twitter metadata；文章頁解析並驗證 BlogPosting JSON-LD。
7. 以 XML parser 解析 sitemap，檢查 URL 集合與實際內容檔數量一致，並檢查 sitemap 中無 localhost/preview/重複/404 URL。
8. RSS `/api/rss.xml` 仍回應 200，且 item URL 為正式 URL。
9. 停止本機 preview server，保存實際命令與輸出摘要。

**允許的修正：** 驗證失敗時回到對應 Task 修正，重新執行該 Task 的測試與 build；不得以修改驗證腳本來放寬驗收條件。

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
npm test -- --run
npm run build
npm run verify:seo
git add scripts/verify-seo.mjs scripts/verify-seo.spec.mjs package.json README.md
git status --short
git commit -m "test: add production SEO verification"
git log --oneline -5
git status --short
```

預期：全部測試、production build、SEO verifier 通過，最後工作樹乾淨。未通過不得宣稱完成。

---

## Task 8: 部署前 review、branch 交付與正式站驗證

**Objective:** 在不直接修改 build output 的前提下，完成 branch review、部署與正式站驗證，產出交接事項要求的交付資訊。

**Files / actions:**
- Review all source changes on `seo/metadata-sitemap`
- Do not manually edit `dist/` or GitHub Pages build output
- 若 deployment repository 為 sibling directory，確認 `deploy.mjs` 的 target/source 路徑與使用者預期一致後才執行

**Step 1: 變更 review**

```bash
git diff master...seo/metadata-sitemap --stat
git diff --check master...seo/metadata-sitemap
git log --oneline --decorate master..seo/metadata-sitemap
```

確認既有文章 slug、RSS route、非本任務檔案沒有意外變更。

**Step 2: deployment preview / deploy**

先以 production preview 驗證，再依使用者明確授權執行既有 deploy 流程。由於正式站位於另一個 sibling repository，本專案只驗證部署前的 build output；不執行也不宣稱正式網址 HTTP 驗收。

**Step 3: 部署輸出驗收（不執行正式站直接驗證）**

本專案透過 `deploy.mjs` 將 `dist/analog/public` 複製到另一個 sibling repository；目前無法在本專案流程中直接對正式站執行 HTTP 驗證。因此本計劃只驗收「可部署輸出」與 deploy 前置條件，不宣稱正式站已通過。

```bash
cd /d/projects/thomascsd-blog
npm run build

# 確認部署輸出存在且包含必要檔案
 test -f dist/analog/public/robots.txt
 test -f dist/analog/public/sitemap.xml
 test -d dist/analog/public/about
 test -d dist/analog/public/tags
 test -d dist/analog/public/blog/2026-03-29-angular-Httpresource

# 驗證部署腳本的來源路徑與 target repository 設定
node --check deploy.mjs
git diff --check
```

以本機 production server 或靜態檔案方式讀取 `dist/analog/public` 的首頁、About、Tags、最新文章、`robots.txt`、`sitemap.xml`，解析並回報 title、description、canonical、OG/Twitter、BlogPosting JSON-LD 實際結果。此結果只能標示為「build output 驗證通過」，不可標示為「正式站驗證通過」。

若日後要驗證正式站，必須由能存取部署後 sibling repository 或正式站環境的執行者，在部署完成後另行執行 HTTP 驗收；不列為本專案本次計劃的必要完成條件。

**Completion / version-control gate**

```bash
cd /d/projects/thomascsd-blog
git status --short
git diff --check
git status --short
git add README.md
git status --short
git commit -m "docs: document SEO deployment and verification"
git log --oneline --decorate -8
git status --short
```

若 README 在前一任務已完成且無新增修改，不建立空 commit；保留最後一個實際 commit 作為 branch 完成點。

---

## 驗收矩陣

| 項目 | 驗收方式 | 必須結果 |
|---|---|---|
| 首頁 | production SSR HTML | 唯一 title、description、canonical、OG、Twitter |
| 文章 | production SSR HTML | 文章 title/description、article canonical、BlogPosting JSON-LD |
| About/Tags | production SSR HTML | 各自唯一 title/description/canonical/social metadata |
| robots | HTTP GET | 200，Allow `/`，指向正式 sitemap |
| sitemap | XML parser + URL fetch | XML 有效、URL 完整、無重複/404/preview domain |
| RSS | HTTP GET `/api/rss.xml` | 200，文章 URL 為正式 URL |
| build | `npm run build` | 成功，輸出含 robots/sitemap 與預渲染頁 |
| tests | `npm test -- --run` | 全部通過 |
| deploy | `dist/analog/public` 輸出檢查 | 必要檔案與預渲染頁存在；本專案不宣稱正式站 HTTP 通過 |

## 風險與處理

- **Analog dynamic route prerender API 差異：** 先以目前 lockfile 實際套件 API 驗證，不在計劃外猜測 API；若 API 不允許直接展開多 route，改採官方支援的 route list 來源。
- **文章 front matter 不完整：** 以檔名日期、現有 description、預設圖片作 deterministic fallback，並在 verifier 報告仍缺少的資料。
- **SSR metadata 時序：** 文章資料是 observable；必須以 build 後原始 HTML 驗證，單看瀏覽器畫面不算通過。
- **trailing slash 不一致：** URL builder、RSS、sitemap、canonical、router prerender 必須共用同一規則；部署 server 若對 slash redirect，仍以最終正式可存取 URL 驗證。
- **部署副作用：** deploy script 會清理 sibling output 目錄；執行前確認 target repository、工作樹與使用者授權，禁止未授權直接部署。

## 預期 commit history

```text
seo/metadata-sitemap
├── docs: document SEO deployment and verification
├── test: add production SEO verification
├── fix: improve semantic markup and content accessibility
├── feat: generate robots sitemap and complete prerender routes
├── feat: add article SEO metadata and BlogPosting schema
├── feat: add metadata for non-article pages
├── feat: add SSR-safe page metadata service
└── feat: add shared SEO data and URL helpers
```

Plan complete. 執行時應逐項完成並在每個 checkpoint 驗證；本回合僅建立計劃，不修改應用程式碼、不建立 branch、不執行 build/deploy。
