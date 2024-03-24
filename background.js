// background.js

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    var tabUrl = tab.url;
    setActivePlatform(tabUrl)
  })
});

function setActivePlatform(url) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    let activePlatform = '';

    if (url.includes('medium.com')) {
      activePlatform = 'medium'
    } else if (url.includes('new.reddit.com')) {
      activePlatform = 'reddit'
    }

    chrome.storage.local.set({activePlatform: activePlatform}, function () {
      console.log('Active platform is:', activePlatform);
    })
  }
}

/**
 * Continue to run Amazon script in background on all sites.
 * NOTE: It may impact the performance of the browser.
 */
chrome.tabs.query({}, function(tabs) {
  tabs.forEach(function(tab) {
    console.log('tab', tab);

    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['js/amazon.js']
    });
  });
});