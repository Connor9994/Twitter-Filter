// ==UserScript==
// @name         Twitter Word Filter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes tweets containing specific words or emojis and "Who to follow" sections from Twitter timeline
// @author       Connor Kaiser (Main), GitHub user "krivdat" for "Who to follow" section & optimization
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        none
// @iconURL      https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F676%2F1%2Fpng-transparent-x-icon-ex-twitter-tech-companies-social-media-thumbnail.png
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const WORDS_FILTER_ENABLED = true;
    const WHO_TO_FOLLOW_REMOVAL_ENABLED = true;
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

    // Function to remove "Who to follow" section
    function removeWhoToFollow() {
        const headings = Array.from(document.querySelectorAll('div[data-testid="cellInnerDiv"] h2'))
            .filter(h2 => h2.textContent.includes('Who to follow'));
        if (headings.length > 0) {
            console.log(`Found ${headings.length} "Who to follow" section${headings.length > 1 ? "s" : ""}`);
            let elementsToRemove = [];

            headings.forEach(heading => {
                    // Get parent div and remove all siblings until "Show more" or a non-UserCell is reached
                    const parentDiv = heading.closest('div[data-testid="cellInnerDiv"]');
                    if (parentDiv) {
                        heading.remove(); // Remove the heading itself to avoid future matches
                        elementsToRemove.push(parentDiv);
                        let sibling = parentDiv.nextElementSibling;
                        while (sibling) {
                            const spanElem = sibling.querySelector('span');
                            if (spanElem && spanElem.textContent === 'Show more') {
                                elementsToRemove.push(sibling);
                                break;
                            }
                            const button = sibling.querySelector('button');
                            if (!button || button.getAttribute('data-testid') !== 'UserCell') {
                                break;
                            }
                            elementsToRemove.push(sibling);
                            sibling = sibling.nextElementSibling;
                        }
                    }
            });
            
            console.log(`Removing ${elementsToRemove.length} element${elementsToRemove.length > 1 ? "s" : ""} related to Who to follow section`);
            elementsToRemove.forEach(el => { el.style.display = 'none' }); // Hide the elements, as removing them breaks the site
        }

        // Also remove Who to follow section(s) in side panel
        const asides = document.querySelectorAll('aside[aria-label="Who to follow"]');
        asides && asides.forEach(aside => { 
            console.log('Removing a Who to follow aside section');
            aside.parentElement && (aside.parentElement.style.display = 'none'); // Hide container to avoid layout issues
            aside.remove();  // Remove the aside itself to avoid future matches
        });
    }

    // Initial run
    WORDS_FILTER_ENABLED ? removeTweetsWithWord() : null;
    WHO_TO_FOLLOW_REMOVAL_ENABLED ? removeWhoToFollow() : null;
    // setInterval(removeTweetsWithWord, CHECK_INTERVAL);
    // No need to use setInterval if using MutationObserver

    // MutationObserver for dynamic content
    const observer = new MutationObserver(() => {
        WORDS_FILTER_ENABLED && removeTweetsWithWord();
        WHO_TO_FOLLOW_REMOVAL_ENABLED && removeWhoToFollow();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
