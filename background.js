// background.js

//replace action.onCLicked event listener with onMessage event listener
chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
    if(message.command === 'execute-script')
    {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            if (tab && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
                let scriptToExecute = '';

                if (tab.url.includes('medium.com')) {
                    scriptToExecute = 'js/medium.js';
                } else if (tab.url.includes('reddit.com')) {
                    scriptToExecute = 'js/reddit.js';
                } else if (tab.url.includes('amazon.com') || tab.url.includes('amzn.to')) {
                    scriptToExecute = 'js/amazon.js';
                }

                if (chrome.scripting && scriptToExecute) {
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: [scriptToExecute]
                    });
                }
            }
        });
    }

    return true
})
