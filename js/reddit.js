function redditScript() {
    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function upvote() {
        const buttons = document.querySelectorAll('[data-click-id="upvote"]');
        buttons.forEach((b, i) => {
            setTimeout(() => {
                const rect = b.getBoundingClientRect();
                if (rect.top >= 0) { // Only scroll to the button if it's below the current scroll position
                    b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                if (b.getAttribute("aria-pressed") == "true") {
                    console.log("already upvoted...");
                } else if (b.getAttribute("aria-pressed") == "false") { 
                    b.click();
                    console.log("upvoting...");
                } else {
                    console.log("something went wrong...");
                }      
            }, i * randomDelay(1000, 3000)); // Random delay between X and X seconds
        });
    }

    upvote();
    setInterval(upvote, randomDelay(2000, 8000)); // Run upvote function every X to X seconds
}

redditScript();