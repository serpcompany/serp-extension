// 1 seconds (1000 ms)
const defaultSpeed = 1000;

// Read speed from Chrome storage
chrome.storage.local.get(["speed"], function (result) {
  const speedInput = document.getElementById("speedInput");

  if (result?.speed === undefined) {
    speedInput.value = defaultSpeed;
    chrome.storage.local.set({ speed: defaultSpeed }, function () {
      console.log("Speed is set to " + defaultSpeed);
    });
  } else {
    speedInput.value = result.speed;
  }
});

// Set speed from the Popup
document.getElementById("setSpeed").onclick = function () {
  var speed = document.getElementById("speedInput").value;
  chrome.storage.local.set({ speed: speed }, function () {
    console.log("Speed is set to " + speed);
  });
};

const redditBtn = document.getElementById("redditBtn");
redditBtn.onclick = startReddit;
const mediumBtn = document.getElementById("mediumBtn");
// const amazonBtn = document.getElementById("amazonBtn");

let activePlatform;
chrome.storage.local.get(["activePlatform"], function (result) {
  resetBtnState();

  activePlatform = result.activePlatform;
  if (activePlatform === "reddit") {
    redditBtn.removeAttribute("disabled");
  } else if (activePlatform === "medium") {
    mediumBtn.removeAttribute("disabled");
  // } else if (activePlatform === "amazon") {
  //   amazonBtn.removeAttribute("disabled");
  }
});

function resetBtnState() {
  redditBtn.setAttribute("disabled", "disabled");
  mediumBtn.setAttribute("disabled", "disabled");
  // amazonBtn.setAttribute("disabled", "disabled");
}

let activeTabId = "";
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  activeTabId = activeTab.id;
});

function startReddit() {
  if (!activeTabId) {
    console.log("Active Tab ID missing!");
    return;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: activeTabId },
      files: ["js/reddit.js"],
    },
    function () {
      redditBtn.innerHTML = "Stop";
      redditBtn.onclick = stopScriptExecution;
    }
  );
}

function stopScriptExecution() {
  console.log("Stop script execution");
  chrome.tabs.sendMessage(activeTabId, {
    message: "___clapper_stop_script",
  });

  if (activePlatform === "reddit") {
    redditBtn.innerHTML = "Start";
    redditBtn.onclick = startReddit;
  }
}
