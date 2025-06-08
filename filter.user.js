// ==UserScript==
// @name         Twitter Word Filter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes tweets containing specific words or emojis from Twitter timeline
// @author       Connor Kaiser
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        none
// @iconURL    https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Ftwitter-icons-png-1.png
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const TARGET_WORDS = ['🇺🇦', '🇮🇱','ה']; // Case-insensitive
    const CHECK_INTERVAL = 1000; // Check every 1 second

    function removeTweetsWithWord() {
        const timeline = document.querySelector('[aria-label*="Timeline"]');
        if (!timeline) return;

        const elements = timeline.getElementsByTagName('*');

        for (const element of elements) {
            for (const word of TARGET_WORDS) {
                const wordLower = word.toLowerCase();
                const elementText = element.textContent || '';
                const elementTextLower = elementText.toLowerCase();
                let altTextLower = '';

                // Check if the element is an image and has an alt attribute
                if (element.tagName === 'IMG') {
                    const altText = element.getAttribute('alt') || '';
                    altTextLower = altText.toLowerCase();
                }

                // Check if either text content or alt text contains the target word
                if (elementTextLower.includes(wordLower) || altTextLower.includes(wordLower)) {
                    const tweet = element.closest('[data-testid="tweet"], [role="article"]');
                    if (tweet) {
                        tweet.remove();
                        console.log('Removed tweet containing:', word);
                        break; // No need to check other words for this element
                    }
                }
            }
        }
    }

    // Initial run and interval setup
    removeTweetsWithWord();
    setInterval(removeTweetsWithWord, CHECK_INTERVAL);

    // MutationObserver for dynamic content
    const observer = new MutationObserver(() => {
        removeTweetsWithWord();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
