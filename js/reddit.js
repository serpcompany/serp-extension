var __clapper_intervalId;
var __clapper_interval_speed;

chrome.storage.local.get(["speed"], function (result) {
  __clapper_interval_speed = result.speed;
});

function redditScript() {
  function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function upvote() {
    const buttons = document.querySelectorAll('[data-click-id="upvote"]');
    buttons.forEach((b) => {
      setTimeout(() => {
        const rect = b.getBoundingClientRect();
        if (rect.top >= 0) {
          // Only scroll to the button if it's below the current scroll position
          b.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        if (b.getAttribute("aria-pressed") == "true") {
          console.log("already upvoted...");
        } else if (b.getAttribute("aria-pressed") == "false") {
          b.click();
          console.log("upvoting...");
        } else {
          console.log("something went wrong...");
        }
      }, __clapper_interval_speed); // Random delay between X and X seconds
    });
  }

  upvote();
  // Run upvote function every X to X seconds
  __clapper_intervalId = setInterval(upvote, randomDelay(2000, 8000));
}

redditScript();

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "___clapper_stop_script") {
    clearInterval(__clapper_intervalId);
  }
});
