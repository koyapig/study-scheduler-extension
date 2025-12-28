## 開発について

このプロジェクトは [Claude Code](https://claude.ai/claude-code) を使用してAIと共同開発しました。

# Study Scheduler Extension

毎日の学習を習慣化するためのChrome拡張機能です。設定した時間に通知でその日の学習タスクをお知らせします。

## 機能

- **毎日20:00に通知** - その日の学習タスクを通知
- **曜日別スケジュール** - 曜日ごとに異なるタスクを設定可能
- **月別自動切り替え** - 試験時期に合わせてスケジュールを自動変更
- **学習記録** - Done/Skipで進捗を記録
- **週別フォーカス** - 週ごとの学習テーマを表示

## インストール

1. このリポジトリをクローン
   ```bash
   git clone https://github.com/your-username/study-scheduler-extension.git
   ```

2. Chromeで `chrome://extensions/` を開く

3. 「デベロッパーモード」をON

4. 「パッケージ化されていない拡張機能を読み込む」をクリック

5. クローンしたフォルダを選択

## スケジュールのカスタマイズ

### 1. user_schedule.json を作成

`data/schedule_template.json` をコピーして `data/user_schedule.json` を作成します。

```bash
cp data/schedule_template.json data/user_schedule.json
```

### 2. スケジュールを編集

```json
{
  "weekday": {
    "monday": [
      { "time": "20:00-21:00", "label": "英語", "enabled": true }
    ],
    "tuesday": [
      { "time": "20:00-20:30", "label": "数学", "enabled": true },
      { "time": "20:30-21:00", "label": "プログラミング", "enabled": true }
    ]
  },
  "weekend": {
    "focus_day": {
      "tasks": [
        { "label": "復習", "enabled": true }
      ]
    }
  }
}
```

### 3. 月別の有効化（オプション）

特定の月だけ有効にしたいタスクには `active_months` を追加：

```json
{
  "time": "20:00-21:00",
  "label": "英語",
  "enabled": true,
  "active_months": ["January", "February", "March"]
}
```

## ファイル構成

```
study-scheduler-extension/
├── manifest.json          # 拡張機能設定
├── background.js          # バックグラウンド処理
├── scheduler.js           # スケジュール管理
├── popup.html/js/css      # ポップアップUI
├── icons/
│   └── icon.png           # 通知アイコン（128x128 PNG）
├── data/
│   ├── schedule_template.json  # テンプレート
│   ├── user_schedule.json      # ユーザー設定（要作成）
│   └── weekly_tasks.json       # 週別テーマ
└── storage/
    └── progress.js        # 進捗保存
```

## 使い方

1. **通知を受け取る** - 毎日20:00に自動通知
2. **テスト** - ツールバーのアイコン → 「Test Notification」
3. **記録** - 学習後に「Done」または「Skip」をクリック

## アイコンについて

`icons/icon.png` には128x128ピクセルのPNG画像を配置してください。通知に表示されます。

## 今後の予定

- [ ] 設定UI（オプションページ）
- [ ] 学習統計の表示
- [ ] リマインダー機能の強化

## ライセンス

MIT
