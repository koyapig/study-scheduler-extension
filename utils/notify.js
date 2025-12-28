export function buildTodayNotification(task) {
  return {
    title: "今日の学習時間です 📘",
    message: task,
    iconUrl: "icon.png"
  };
}

