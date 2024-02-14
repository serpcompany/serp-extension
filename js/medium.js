async function mediumScript() {
    const events = ['mousedown', 'mouseup', 'click'];

    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

            await new Promise(resolve => setTimeout(resolve, randomDelay(100, 400))); // Random delay between 50ms and 200ms
        }
    }

    let clapButtons, previousLength;
    do {
        previousLength = clapButtons ? clapButtons.length : 0;
        clapButtons = document.querySelectorAll('.clapButton, button:has(svg[aria-label="clap"])');

        for (const clapButton of clapButtons) {
            await performClaps(clapButton);
            await new Promise(resolve => setTimeout(resolve, randomDelay(500, 1500))); // Wait 0.5 to 1 second before next button
        }

        // Scroll down and wait for potential new content
        window.scrollBy(0, window.innerHeight);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds

        // Recheck for new clap buttons
        clapButtons = document.querySelectorAll('.clapButton, button:has(svg[aria-label="clap"])');
    } while (clapButtons.length > previousLength);
}

mediumScript();