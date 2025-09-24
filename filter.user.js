// ==UserScript==
// @name         Twitter Word Filter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes tweets containing specific words or emojis from Twitter timeline
// @author       Connor Kaiser
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        none
// @iconURL      https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F676%2F1%2Fpng-transparent-x-icon-ex-twitter-tech-companies-social-media-thumbnail.png
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const TARGET_WORDS = ['🇺🇦', '🇮🇱','ה', 'Musk']; // Case-insensitive
    // const CHECK_INTERVAL = 1000; // Check every 1 second
    // No need for interval if using MutationObserver

    function removeTweetsWithWord() {
        const timeline = document.querySelector('[aria-label*="Timeline"]');
        if (!timeline) return;

        const tweets = timeline.querySelectorAll('article[data-testid="tweet"]'); // Target only tweet elements

        for (const tweet of tweets) {
            const parentDiv = tweet.closest('div[data-testid="cellInnerDiv"]');
            const tweetText = tweet.textContent.toLowerCase() || '';
            const tweetImages = tweet.querySelectorAll('img');
            let shouldRemove = false;

            // Check if any target word is in the tweet's text content
            for (const word of TARGET_WORDS) {
                if (tweetText.includes(word.toLowerCase())) {
                    shouldRemove = true;
                    console.log('Removing tweet with text match:', word);
                    break;
                }
            }

            if (shouldRemove) {
                if (parentDiv) parentDiv.style.display = 'none';
                tweet.remove();
                continue; // No need to check images, move to next tweet
            }

            // Check if any target word is in an image's alt text
            for (const img of tweetImages) {
                const altText = img.getAttribute('alt') || '';
                if (altText) {
                    for (const word of TARGET_WORDS) {
                        if (altText.toLowerCase().includes(word.toLowerCase())) {
                            shouldRemove = true;
                            console.log('Removing tweet with image alt match:', word);
                            break;
                        }
                    }
                }

                if (shouldRemove) {
                    if (parentDiv) parentDiv.style.display = 'none';
                    tweet.remove();
                    break; // No need to check other images, move to next tweet
                }
            }
        }
    }

    // Initial run
    removeTweetsWithWord();
    // setInterval(removeTweetsWithWord, CHECK_INTERVAL);
    // No need to use setInterval if using MutationObserver

    // MutationObserver for dynamic content
    const observer = new MutationObserver(() => {
        removeTweetsWithWord();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
