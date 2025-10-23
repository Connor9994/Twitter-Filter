# Twitter Word Filter and Bloat Remover

![GitHub stars](https://img.shields.io/github/stars/Connor9994/Twitter-Filter?style=social) ![GitHub forks](https://img.shields.io/github/forks/Connor9994/Twitter-Filter?style=social) ![GitHub issues](https://img.shields.io/github/issues/Connor9994/Twitter-Filter) 

## Overview
This user script provides two functions and both can be enabled/disabled:
1. Automatically filters out tweets containing specific words, phrases, or emojis from your Twitter/X timeline. It runs in the background while you browse Twitter/X and removes matching tweets in real-time. The [default block feature](https://x.com/settings/muted_keywords) on Twitter only blocks content in the body of the post. This will also filter out users with those items in their names. 
- Avoid spoilers
- Avoid politics
- Avoid bots
- Avoid parody accounts
- Avoid triggering content
- Avoid anything :)
2. Removes sections with suggested accounts to follow, which can become distracting when you want to focus only on accounts you follow. The sections are removed from the main timeline as well as from the side panel.

## Features
- **Real-time filtering**: Continuously scans your timeline as you browse
- **Emoji support**: Filters tweets containing specific emojis (e.g., flags)
- **Dynamic content handling**: Works with Twitter/X's infinite scrolling
- **Case-insensitive matching**: Ignores capitalization differences
- **Customizable word list**: Easily modify the filter terms
- **Console logging**: Optionally displays removed tweets for debugging

## Installation
1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/) (Firefox)

2. Install the script:
   - [Direct Install Link](https://github.com/Connor9994/Twitter-Filter/raw/refs/heads/main/filter.user.js)
   - Or copy/paste the script code into a new userscript
## Configuration
Customize the filter by editing these values in the script:

```javascript
// Enable or disable words filter and "Who to follow" sections remover
const WORDS_FILTER_ENABLED = true;
const WHO_TO_FOLLOW_REMOVAL_ENABLED = true;
// Words/emojis to filter (case-insensitive)
const TARGET_WORDS = ['🇺🇦', '🇮🇱','NAFO','Trump','Elon']; 
```

**To modify:**
1. Open Tampermonkey dashboard
2. Find "Twitter Word Filter" script
3. Click "Edit"
4. Modify `WORDS_FILTER_ENABLED` and `WHO_TO_FOLLOW_REMOVAL_ENABLED` values to false as you wish
5. Modify the `TARGET_WORDS` array
6. Save changes with Ctrl+S / Cmd+S

## How It Works
1. **Checks all text content** within tweets
2. **Examines image alt-text** for emojis and keywords
3. **Removes entire tweets** containing any target word/emoji
4. **Removes "Who to follow" sections** from the layout
5. **Monitors DOM changes** to handle new tweets as they load

## Compatibility
- **Browsers**: Chrome, Firefox, Edge, Safari
- **Sites**: twitter.com, x.com
- **Userscript Managers**: Tampermonkey, Greasemonkey, Violentmonkey

## Troubleshooting
- If tweets aren't being removed:
  1. Refresh the page
  2. Check Tampermonkey dashboard to ensure script is enabled
  3. Verify target words match exactly (including emojis)
  4. Open browser console (F12) to check for error messages

- To see removal logs in console:
  1. Open browser developer tools (F12)
  2. Navigate to "Console" tab
  3. Look for "Removing tweet with text match:", "Removing tweet with image alt match:", "Removing elements related to Who to follow section" or "Removing a Who to follow aside section" messages

## Limitations
- Doesn't work with Twitter's mobile site or app
- Twitter/X DOM changes may require script updates

## Contributing
Contributions are welcome! Please open an issue or pull request.
