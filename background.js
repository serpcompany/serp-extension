chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
        let scriptToExecute = '';

        if (tab.url.includes('medium.com')) {
            scriptToExecute = 'js/medium.js';
        } else if (tab.url.includes('reddit.com')) {
            scriptToExecute = 'js/reddit.js';
        }

        if (chrome.scripting && scriptToExecute) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: [scriptToExecute]
            });
        }
    }
});