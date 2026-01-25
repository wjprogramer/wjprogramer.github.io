# 內容載入機制說明

## 概述

為了改善載入性能，`content.js` 已拆分為多個文件，並實現了 lazy loading 機制。

## 文件結構

### 拆分後的文件

**擊球技術類別**（進一步拆分為 6 個文件）：
- `content-hitting-basic.js` - 基礎擊球技術（8 篇文章）
- `content-hitting-advanced.js` - 進階擊球技術（4 篇文章）
- `content-hitting-smash-variations.js` - 殺球變化（4 篇文章）
- `content-hitting-net.js` - 網前技術（6 篇文章）
- `content-hitting-backhand.js` - 反手技術（5 篇文章）
- `content-hitting-defense.js` - 防守技術（3 篇文章）

**其他類別**：
- `content-basic-movement.js` - 基本動作類別（5 篇文章）
- `content-tactics.js` - 戰術類別（3 篇文章）
- `content-training.js` - 訓練類別（2 篇文章）
- `content-equipment.js` - 裝備類別（2 篇文章）

### 核心文件

- `content-loader.js` - 內容載入器，實現 lazy loading
- `content-file-map.js` - 文章 ID 到文件路徑的映射表（自動生成）
- `content.js` - 向後兼容層（已廢棄，建議使用 content-loader.js）

## 使用方法

### 載入單篇文章

```javascript
import { loadContent } from '../data/content-loader.js';

// 載入指定文章
const article = await loadContent('grip');
if (article) {
  // 使用文章內容
  console.log(article.title);
}
```

### 預載入多篇文章

```javascript
import { preloadContent } from '../data/content-loader.js';

// 預載入多篇文章（例如：收藏列表中的文章）
await preloadContent(['grip', 'smash', 'serve']);
```

### 清除快取

```javascript
import { clearCache } from '../data/content-loader.js';

// 清除已載入的模組快取（用於開發時的熱重載）
clearCache();
```

## 性能優勢

1. **按需載入**：只載入用戶實際訪問的文章，而不是一次性載入所有 42 篇文章
2. **模組快取**：已載入的模組會被快取，重複訪問同一類別的文章時無需重新載入
3. **並行載入**：預載入功能支援並行載入多個文件
4. **進一步優化**：擊球技術類別進一步拆分為 6 個文件，最大文件從 ~350KB 降低到 ~183KB

### 文件大小對比

- **原文件**：`content.js` - ~16670 行，~350KB（一次性載入所有 42 篇文章）
- **第一次拆分後**：
  - 擊球技術類別 - ~350KB（30 篇文章，仍然很大，需要進一步拆分）
  - 其他類別文件 - ~30-100KB
- **進一步拆分後**（擊球技術類別）：
  - `content-hitting-basic.js` - ~183KB（8 篇文章）
  - `content-hitting-advanced.js` - ~39KB（4 篇文章）
  - `content-hitting-smash-variations.js` - ~28KB（4 篇文章）
  - `content-hitting-net.js` - ~30KB（6 篇文章）
  - `content-hitting-backhand.js` - ~42KB（5 篇文章）
  - `content-hitting-defense.js` - ~29KB（3 篇文章）

**性能提升**：
- 原文件：一次性載入所有 42 篇文章（~350KB）
- 現在：只載入用戶訪問的文章所屬的文件（平均 ~30-50KB，最大 ~183KB）
- **載入時間減少約 80-90%**（只載入需要的文件）

## 遷移指南

### 舊代碼（已廢棄）

```javascript
import { contentData } from '../data/content.js';

const article = contentData['grip'];
```

### 新代碼（推薦）

```javascript
import { loadContent } from '../data/content-loader.js';

const article = await loadContent('grip');
```

## 重新生成文件

如果需要重新生成拆分文件（例如：添加了新文章），可以運行：

```bash
python split_content_v2.py
```

**注意**：此腳本會自動：
1. 解析 `content.js`（如果還存在完整版本）
2. 按類別拆分文章
3. 生成 `content-file-map.js` 映射表

## 注意事項

1. 拆分後的文件是自動生成的，請勿手動編輯
2. 如果需要修改內容，請修改原始 `content.js`（如果保留）或直接修改對應的拆分文件
3. 修改後需要重新運行拆分腳本以更新映射表

