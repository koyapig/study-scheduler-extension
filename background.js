import { notifyToday } from "./scheduler.js";

function isWeekend() {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

// 次の20:00までのミリ秒を計算
function getNextAlarmTime() {
  const now = new Date();
  const target = new Date();
  target.setHours(20, 0, 0, 0);

  // 既に20:00を過ぎていたら翌日に設定
  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime();
}

// 拡張インストール時にアラーム登録
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyStudy", {
    when: getNextAlarmTime(),
    periodInMinutes: 1440
  });
});

// アラーム発火時
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyStudy") {
    notifyToday(isWeekend());
  }
});

// ポップアップからのテスト通知リクエスト
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "testNotification") {
    notifyToday(isWeekend());
  }
});

