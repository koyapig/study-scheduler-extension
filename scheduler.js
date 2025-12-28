async function loadJson(path) {
  const res = await fetch(chrome.runtime.getURL(path));
  if (!res.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return res.json();
}

function getCurrentWeek() {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const now = new Date();
  return Math.ceil(
    ((now - start) / 86400000 + start.getDay() + 1) / 7
  );
}

export async function notifyToday(isWeekend) {
  const today = new Date();
  const weekday = today
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();
  const month = today.toLocaleString("en-US", { month: "long" });

  // user_schedule.json を優先、なければ template を使用
  let schedule;
  try {
    schedule = await loadJson("data/user_schedule.json");
  } catch {
    schedule = await loadJson("data/schedule_template.json");
  }
  const weekly = await loadJson("data/weekly_tasks.json");

  let text = "";

  if (!isWeekend && schedule.weekday[weekday]) {
    text = schedule.weekday[weekday]
      .filter(
        (b) =>
          b.enabled &&
          (!b.active_months || b.active_months.includes(month))
      )
      .map((b) => `${b.time} ${b.label}`)
      .join("\n");
  }

  if (isWeekend) {
    text = schedule.weekend.focus_day.tasks
      .filter(
        (t) =>
          t.enabled &&
          (!t.active_months || t.active_months.includes(month))
      )
      .map((t) => t.label)
      .join(" / ");
  }

  const week = getCurrentWeek();
  const focus =
    weekly.weeks.find((w) => w.week === week)?.focus ||
    "Regular Study";

  chrome.notifications.create("dailyStudy", {
    type: "basic",
    title: "Today's Study",
    message: `${text}\n\n[This Week]\n${focus}`,
    iconUrl: chrome.runtime.getURL("icons/icon.png")
  });
}

export function gentleNudge(days) {
  chrome.notifications.create({
    type: "basic",
    title: "Gentle Reminder",
    message: `${days} days without study. Just 5 minutes is OK.`,
    iconUrl: chrome.runtime.getURL("icons/icon.png")
  });
}

export function strongNudge(days) {
  chrome.notifications.create({
    type: "basic",
    title: "Time to Restart",
    message: `${days} days stopped. Restart now to keep momentum.`,
    iconUrl: chrome.runtime.getURL("icons/icon.png")
  });
}

