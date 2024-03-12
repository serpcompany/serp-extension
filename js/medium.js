

async function mediumScript() {
    const events = ['mousedown', 'mouseup', 'click'];

    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const storageGet = (key) => new Promise((resolve) => chrome.storage.local.get(key).then((data) => resolve(data[key])))

    //load user speed settings, assign it with an empty object if it hasnt been assigned by user
    let speedSettings = await storageGet("medium-speed-settings") ?? {} 
    
    console.log(speedSettings)

    speedSettings = {
        scrollDelay: isNaN(speedSettings.scrollDelay) ? 3000:speedSettings.scrollDelay*1000,
        navigationDelay: isNaN(speedSettings.navigationDelay) ? randomDelay(500, 1500):speedSettings.navigationDelay*1000,
        clapActionDelay: isNaN(speedSettings.clapActionDelay) ? randomDelay(100, 400):speedSettings.clapActionDelay*1000,
    }
    
    console.log(speedSettings)

    async function performClaps(clapButton) {
        clapButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        for (let i = 0; i < 50; i++) { // Clap 50 times
            if (Math.random() < 0.03) continue; // 3% chance to skip a clap

            const rect = clapButton.getBoundingClientRect();
            const baseX = window.scrollX + rect.left + rect.width / 2;
            const baseY = window.scrollY + rect.top + rect.height / 2;

            for (let eventType of events) {
                let event = new MouseEvent(eventType, {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true,
                    'clientX': baseX + Math.random() * 10 - 5, // Random coordinate near the button
                    'clientY': baseY + Math.random() * 10 - 5
                });
                clapButton.dispatchEvent(event);
            }
             
            //random delay between each clap action is either read from user's speed settings or Random delay between 100ms and 400ms
            await new Promise(resolve => setTimeout(resolve, speedSettings.clapActionDelay));
        }
    }

    let clapButtons, previousLength;
    do {
        previousLength = clapButtons ? clapButtons.length : 0;
        clapButtons = document.querySelectorAll('.clapButton, button:has(svg[aria-label="clap"])');

        for (const clapButton of clapButtons) {
            await performClaps(clapButton);
            await new Promise(resolve => setTimeout(resolve, speedSettings.navigationDelay)); // Read user delay or Wait 0.5 to 1 second before next button
        }

        // Scroll down and wait for potential new content
        window.scrollBy(0, window.innerHeight);
        await new Promise(resolve => setTimeout(resolve, speedSettings.scrollDelay)); // Read user delay or Wait for 3 seconds

        // Recheck for new clap buttons
        clapButtons = document.querySelectorAll('.clapButton, button:has(svg[aria-label="clap"])');
    } while (clapButtons.length > previousLength);
}

mediumScript();
