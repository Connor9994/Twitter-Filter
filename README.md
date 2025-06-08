# Twitter Word Filter

## Overview
This user script automatically filters out tweets containing specific words, phrases, or emojis from your Twitter/X timeline. It runs in the background while you browse Twitter/X and removes matching tweets in real-time. The [default block feature](https://x.com/settings/muted_keywords) on Twitter only blocks content in the body of the post. This will also filter out users with those items in their names. 

- Avoid spoilers
- Avoid politics
- Avoid bots
- Avoid parody accounts
- Avoid triggering content
- Avoid anything :)

## Features
- **Real-time filtering**: Continuously scans your timeline as you browse
- **Emoji support**: Filters tweets containing specific emojis (e.g., flags)
- **Image alt-text scanning**: Detects keywords in image descriptions
- **Dynamic content handling**: Works with Twitter/X's infinite scrolling
- **Case-insensitive matching**: Ignores capitalization differences
- **Customizable word list**: Easily modify the filter terms
- **Console logging**: Optionally logs removed tweets for debugging

## Installation
1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/) (Firefox)

2. Install the script:
   - [Direct Install Link](https://raw.githubusercontent.com/Connor9994/Twitter-Filter/refs/heads/main/filter.user.js)
   - Or copy/paste the script code into a new userscript

## Configuration
Customize the filter by editing these values in the script:

```javascript
// Words/emojis to filter (case-insensitive)
const TARGET_WORDS = ['🇺🇦', '🇮🇱','NAFO','Trump','Elon']; 

// How often to check for new tweets (milliseconds)
const CHECK_INTERVAL = 1000; 
```

**To modify:**
1. Open Tampermonkey dashboard
2. Find "Twitter Word Filter" script
3. Click "Edit"
4. Modify the `TARGET_WORDS` array
5. Save changes with Ctrl+S / Cmd+S

## How It Works
1. **Scans your timeline** every second (configurable)
2. **Checks all text content** within tweets
3. **Examines image alt-text** for emojis and keywords
4. **Removes entire tweets** containing any target word/emoji
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
  3. Look for "Removed tweet containing:" messages

## Limitations
- Doesn't work with Twitter's mobile site or app
- Twitter/X DOM changes may require script updates

## Contributing
Contributions are welcome! Please open an issue or pull request.
