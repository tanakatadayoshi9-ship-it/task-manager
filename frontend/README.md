# Task Manager Web Application

シンプルで使いやすいフルスタックのタスク管理Webアプリケーションです。

---

## 🔧 使用技術 (Tech Stack)

### フロントエンド
- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)

### バックエンド
- Node.js
- Express.js
- SQLite

### デプロイ
- Backend: Render
- Frontend: （準備中 / Local）

---

## ✨ 機能 (Features)

- タスクの追加
- タスクのステータス変更（Todo / Doing / Done）
- タスクの削除
- SQLite によるデータ永続化
- REST API を使用したフロントエンド・バックエンド分離構成

---

## 🌐 API エンドポイント

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/tasks` | 全タスク取得 |
| POST | `/tasks` | 新しいタスク作成 |
| PUT | `/tasks/:id` | ステータス更新 |
| DELETE | `/tasks/:id` | タスク削除 |

---

## ▶️ ローカル起動方法

### Backend
```bash
cd backend
npm install
node server.js
![Task Manager](./frontend/screenshots/app.png)



