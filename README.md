# Superhero StreamerSongList Overlay

A dynamic, comic book-styled overlay for displaying your current queue on streamersonglist.com with airport flip-board animations!

If you are a Twitch streamer using streamersonglist.com and you would like to show your song list on screen with superhero flair, this overlay provides an exciting visual experience for your viewers.

## Prerequisites

* An active account at streamersonglist.com.
* Streaming software capable of showing a Browser Source, such as **OBS** or **StreamLabs OBS**.

## Initial setup

Download the ZIP file and extract it somewhere on your computer, for example, **C:\streamoverlays**.

Go inside the ```lib``` directory and open ```streamersonglist.js```. Near the top, you will see something like this:

```
const streamerName = "yourTwitchName";
```

Replace **yourTwitchName** with your Twitch name, making sure to keep the double quotes in place (the **"** characters), and save the file.

## Testing

If you would like to test if it's working properly, you can open the ```queue.html``` file in your browser. Usually you can just double-click this from Windows Explorer to open it in a browser.

You should see "queue is empty" with superhero styling. If this is the case, you can add songs to your queue using streamersonglist.com and watch them appear with dynamic flip-board animations.

## Streaming setup

Add a new Browser Source to your overlays. This should be at a width of **1024** and a height of **768** for the optimal 4:3 aspect ratio display.

Pick **use local file** and then find the ```queue.html``` file from your download, such as **C:\streamoverlays\queue.html**.

When you save, you should see the queue (or lack of queue) show up in the overlay immediately with comic book styling.

## Profile System

The overlay now includes a comprehensive profile system that allows you to customize the appearance and effects without editing code!

### Quick Profile Setup

1. **Open Profile Selector**: Open `profile-selector.html` in your browser
2. **Choose a Style**: Select from 5 pre-built profiles:
   - **Superhero** (Default): Comic book style with vibrant effects
   - **Minimal**: Clean and simple design
   - **Neon**: Cyberpunk-inspired with glowing effects  
   - **Retro**: 80s-inspired with classic styling
   - **Elegant**: Sophisticated with refined typography
3. **Apply**: Click "Apply Selected Profile" to activate
4. **Preview**: Use "Preview Overlay" to see the result

### Profile Features

- **Visual Themes**: Complete color schemes and typography
- **Effect Control**: Enable/disable animations, glow, bounce, etc.
- **Font Customization**: Different font families for each profile
- **Layout Options**: Borders, shadows, spacing configurations
- **Background Styles**: Gradients, patterns, and animations

### Creating Custom Profiles

For advanced customization, edit `profile-config.js` to create your own profiles or modify existing ones. See `PROFILE_GUIDE.md` for detailed instructions.

### Keyboard Shortcuts

- **Ctrl+P**: Open profile selector (when overlay is focused)

## Superhero Features

### Information Display
- **Multi-Line Layout**: Each piece of information gets its own dedicated line
- **Queue Position**: Bouncy counter with golden borders and visual separators
- **Song Title**: Large, prominent display with glowing text effects
- **Artist Name**: Distinct orange styling with pulse animations
- **Requested By**: Purple shimmer effects with color cycling
- **Visual Hierarchy**: Clear information structure with proper spacing

### Animation System
- **Airport Flip-Board Transitions**: Songs transition with realistic flip-board animations
- **Letter-by-Letter Animation**: Text appears with staggered letter animations
- **Position Bounce**: Queue position continuously bounces with superhero energy
- **Title Glow**: Song titles pulse with enhanced glow effects
- **Artist Pulse**: Artist names scale and pulse with enhanced shadows
- **Requester Shimmer**: Requested by text cycles through purple color variations

### Visual Effects
- **Comic Book Fonts**: Uses Bangers and Fredoka One fonts for authentic superhero styling
- **Colorful Text Effects**: Multi-layered text shadows in vibrant colors
- **Sparkle Effects**: Animated sparkles add visual flair above content
- **Glowing Borders**: Pulsing golden borders on info panels
- **Dynamic Notifications**: Scaling notifications with comic book styling
- **Background Animation**: Subtle animated background patterns

## Technical Features

- **4:3 Aspect Ratio Design**: Optimized for streaming overlays with 1024x768 resolution
- **Real-time WebSocket Updates**: Instant updates when songs are added, removed, or played
- **Song Rotation**: Automatically cycles through queue items with smooth animations
- **Queue Information**: Shows current queue count and connection status
- **Responsive Design**: Adapts to different screen sizes while maintaining aspect ratio
- **Song Limit Display**: Shows remaining or maximum song requests (configurable)

## Fixed Issues

- Fixed missing `addDivToQueueWrapper` function error
- Fixed incorrect sort function that was returning boolean instead of number
- Fixed memory leak from multiple `setInterval` timers
- Implemented proper queue rotation with interval management
- Added comprehensive WebSocket event handling
- Unified CSS styling with consistent 4:3 aspect ratio
- Added notification system for real-time feedback
- Implemented `maxQueueItems` and `showMore` functionality
- Added song limit display functionality

## Settings

You can customise a lot of settings by editing the ```const``` values at the top of ```lib/streamersonglist.js```. Just open it in your favourite text editor and refer to the settings below for an explanation.

### apiUrl

The URL where the streamersonglist.com API is found. You will not need to edit this!

### streamerName

Your name on Twitch, in lower case. This should match the name you're using on streamersonglist.com as well, which is normally automatic when you sign up.

For example, if your name on Twitch is "My_Cool_Name", you would use "my_cool_name" (lower case).

### streamerId

Your streamer ID from streamersonglist.com. This is required for WebSocket functionality.

### allCaps

If this is ```true```, it will cause the queue to be shown in capital letters all the time. If this is ```false```, a mix of upper case and lower case will be used.

### maxQueueItems

The maximum number of items that will be shown in the queue. For example, if you set this to ```3```, only the first three items in the queue will appear. See **showMore** if you want to let viewers know that there are more than your maximum number of items in the queue.

### showMore

If ```true```, a "+X more in queue" message will appear at the bottom of the queue when there's more items in the queue than **maxQueueItems**. Set this to ```false``` if you don't want this to show at the bottom.

### showSongLimit

If set to something other than ```no```, will show the request limit current configured in Streamer Song List.
  
 There are two possible values you could use here:
 - ```maximum``` will show the total number of requests allowed for this stream
 - ```remaining``` will show the number of requests that are remaining

### rotationSpeed

The speed at which songs in the queue rotate, in milliseconds. Default is 5000 (5 seconds). Note that additional time is added for flip animations.

## WebSocket Events

The overlay now supports real-time updates through WebSocket connections, providing instant feedback for:

- New songs added to queue (with notifications)
- Songs removed from queue (with notifications)
- Songs played and moved to history (with "Now Playing" notifications)
- Queue updates and changes
- Connection status monitoring

## Animation Details

The overlay features several animation types:

- **Flip Enter**: Songs enter with a 3D flip from -90 degrees with bounce
- **Flip Exit**: Songs exit with a 3D flip to 90 degrees
- **Letter Flip**: Individual letters animate in with staggered timing
- **Position Bounce**: Queue position continuously bounces
- **Info Pulse**: Information panels pulse with glowing effects
- **Sparkle**: Decorative sparkles animate above songs

## Browser Compatibility

This overlay works in all modern browsers and is optimized for use in streaming software browser sources like OBS and StreamLabs OBS.