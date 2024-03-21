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
    } else if (url.includes('amazon.com') || url.includes('amzn.to')) {
      activePlatform = 'amazon'
    }

    chrome.storage.local.set({activePlatform: activePlatform}, function () {
      console.log('Active platform is:', activePlatform);
    })
  }
}
