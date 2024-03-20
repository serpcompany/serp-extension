var __clapper_intervalId;
var __clapper_mediumSpeedEachClap;
var __clapper_mediumSpeedEachArticle;
var __clapper_mediumSpeedPageScroll;
var __clapper_enabled = true;

chrome.storage.local.get(
  ["mediumSpeedEachClap", "mediumSpeedEachArticle", "mediumSpeedPageScroll"],
  function (result) {
    __clapper_mediumSpeedEachClap = result.mediumSpeedEachClap;
    __clapper_mediumSpeedEachArticle = result.mediumSpeedEachArticle;
    __clapper_mediumSpeedPageScroll = result.mediumSpeedPageScroll;
  }
);

async function mediumScript() {
  const events = ["mousedown", "mouseup", "click"];

  async function performClaps(clapButton) {
    clapButton.scrollIntoView({ behavior: "smooth", block: "nearest" });

    for (let i = 0; i < 50; i++) {
      // Clap 50 times
      if (Math.random() < 0.03) continue; // 3% chance to skip a clap

      const rect = clapButton.getBoundingClientRect();
      const baseX = window.scrollX + rect.left + rect.width / 2;
      const baseY = window.scrollY + rect.top + rect.height / 2;

      for (let eventType of events) {
        let event = new MouseEvent(eventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: baseX + Math.random() * 10 - 5, // Random coordinate near the button
          clientY: baseY + Math.random() * 10 - 5,
        });
        clapButton.dispatchEvent(event);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, __clapper_mediumSpeedEachClap)
      ); // Delay b/w each clap
    }
  }

  let clapButtons, previousLength;
  do {
    previousLength = clapButtons ? clapButtons.length : 0;
    clapButtons = document.querySelectorAll(
      '.clapButton, button:has(svg[aria-label="clap"])'
    );

    for (const clapButton of clapButtons) {
      await performClaps(clapButton);
      await new Promise((resolve) =>
        setTimeout(resolve, __clapper_mediumSpeedEachArticle)
      ); // Wait before next button
    }

    // Scroll down and wait for potential new content
    window.scrollBy(0, window.innerHeight);
    await new Promise((resolve) => setTimeout(resolve, __clapper_mediumSpeedPageScroll)); // For scrolling

    // Recheck for new clap buttons
    clapButtons = document.querySelectorAll(
      '.clapButton, button:has(svg[aria-label="clap"])'
    );
  } while (clapButtons.length > previousLength && __clapper_enabled);
}

mediumScript();

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "___clapper_stop_script") {
    __clapper_enabled = false;
  }
});
