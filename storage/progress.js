export function saveProgress(status) {
  const today = new Date().toISOString().slice(0, 10);
  chrome.storage.local.set({
    lastProgressDate: today,
    lastStatus: status
  });
}

export function checkStagnation(callback) {
  chrome.storage.local.get("lastProgressDate", (data) => {
    if (!data.lastProgressDate) {
      callback(999);
      return;
    }
    const last = new Date(data.lastProgressDate);
    const diff =
      (new Date() - last) / (1000 * 60 * 60 * 24);
    callback(Math.floor(diff));
  });
}

