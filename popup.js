import { saveProgress } from "./storage/progress.js";

document.getElementById("done").onclick = () => {
  saveProgress("done");
  show("Great job!");
};

document.getElementById("skip").onclick = () => {
  saveProgress("skip");
  show("No worries. Tomorrow is fine.");
};

document.getElementById("test").onclick = () => {
  chrome.runtime.sendMessage({ action: "testNotification" });
  show("Notification sent!");
};

function show(msg) {
  document.getElementById("msg").innerText = msg;
}

