# 內容格式規劃

## 內容儲存方式

- **格式**：JSON（主要）+ Markdown（如需要）
- **儲存位置**：Hardcode 在專案中
- **更新方式**：直接修改檔案

## 內容結構

### 基本內容結構（JSON）

```json
{
  "id": "unique-id",
  "title": {
    "zh-TW": "標題",
    "zh-CN": "标题",
    "en": "Title",
    "ja": "タイトル"
  },
  "category": {
    "type": "技術類型",
    "scenario": ["單打", "雙打", "混雙", "通用"]
  },
  "tags": ["標籤1", "標籤2"],
  "content": {
    "sections": [
      {
        "type": "text",
        "title": "章節標題",
        "content": "文字內容"
      },
      {
        "type": "image",
        "src": "圖片路徑",
        "alt": "圖片說明"
      },
      {
        "type": "video",
        "src": "影片 URL",
        "title": "影片標題"
      },
      {
        "type": "interactive",
        "component": "互動元件名稱",
        "data": {}
      }
    ]
  },
  "related": ["相關內容 ID"],
  "comparison": ["對比內容 ID"],
  "practicePlan": {},
  "faq": []
}
```

## 內容類型

### 1. 文字內容 (text)

- 支援 Markdown 格式
- 支援多層級標題
- 支援列表、表格等

### 2. 圖片內容 (image)

- 圖片路徑
- 圖片說明（多語言）
- 可選：圖片尺寸、對齊方式

### 3. 影片內容 (video)

- 影片 URL（YouTube、Vimeo 等）
- 影片標題
- 可選：開始時間、結束時間

### 4. 互動內容 (interactive)

- 互動元件名稱
- 互動資料
- 例如：互動式圖解、動畫等

## 格式化要求

### 樣式一致性

- 所有內容類型需要有統一的樣式表現
- 文字內容的排版要一致
- 圖片、影片的顯示方式要統一
- 互動內容的互動方式要一致

### 響應式設計

- 所有內容類型都要支援響應式
- 在不同裝置上都能正常顯示

### 多語言支援

- 所有文字內容都要支援多語言
- 圖片、影片的說明文字也要多語言
- 互動內容的文字也要多語言

## 內容組織

### 檔案結構

```
data/
├── content/
│   ├── basics/
│   │   ├── rules.json
│   │   ├── court.json
│   │   └── equipment.json
│   ├── techniques/
│   │   ├── grip.json
│   │   ├── serve.json
│   │   └── ...
│   └── ...
├── tags.json
└── learning-paths.json
```

### 內容索引

- 建立內容索引檔案，方便搜尋和分類
- 包含所有內容的基本資訊（ID、標題、分類、標籤等）

