# StreamerSongList Queue Overlay - Production Build

A clean, animated queue overlay for StreamerSongList with flip animations and optimized spacing.

## Features

- **Flip Animations**: Smooth card-flip transitions for queue items
- **Optimized Layout**: Reduced whitespace and compact 10% smaller canvas
- **Dark Theme**: Gradient backgrounds with varying opacity for queue items
- **Responsive Design**: 4:3 aspect ratio (1024x691px) optimized for streaming

## Files

- `queue.html` - Main overlay page
- `queue.css` - Styling and animations
- `lib/streamersonglist.js` - Core functionality
- `lib/jquery-3.2.1.min.js` - jQuery dependency

## Live Demo

🔗 **[View Live Overlay](https://bells.vuvu.dev/queue.html)**

## Usage

### For Streamers
1. Use the live overlay URL in OBS Browser Source: `https://bells.vuvu.dev/queue.html`
2. Set dimensions to 1024x691 pixels
3. Add your streamer name as a URL parameter: `https://bells.vuvu.dev/queue.html?streamer=YOUR_STREAMER_NAME`
   - Replace `YOUR_STREAMER_NAME` with your actual StreamerSongList username
   - Example: `https://bells.vuvu.dev/queue.html?streamer=bellstream`

### For Local Development
1. Open `queue.html` in OBS Browser Source
2. Set dimensions to 1024x691 pixels
3. Configure StreamerSongList API connection

## Animation Effects

- **Current Song**: Gentle red fade animation
- **Queue Items**: Flip-in/flip-out transitions (0.6s duration)
- **No Double Effects**: Clean single animation per transition

This is a production-ready build with only essential files for deployment.

## Credits

- **Author**: [vUvuvu](https://github.com/vUvuvu)


