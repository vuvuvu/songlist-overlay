# Profile System Guide

The StreamerSongList Overlay now includes a comprehensive profile system that allows you to customize the appearance and effects of your queue overlay. This guide will help you understand and use the profile system effectively.

## Quick Start

1. **Open the Profile Selector**: Open `profile-selector.html` in your browser
2. **Choose a Profile**: Click on any profile card to select it
3. **Apply the Profile**: Click "Apply Selected Profile" to activate it
4. **Preview**: Use "Preview Overlay" to see how it looks

## Available Profiles

### 🦸 Superhero (Default)
- **Style**: Comic book inspired with vibrant colors
- **Fonts**: Bangers, Fredoka One, Bungee
- **Effects**: All effects enabled (animations, glow, bounce, etc.)
- **Best for**: Energetic streams, gaming content

### 🎯 Minimal
- **Style**: Clean and simple design
- **Fonts**: Roboto (clean sans-serif)
- **Effects**: No animations or effects
- **Best for**: Professional streams, focus on content

### 🌈 Neon
- **Style**: Cyberpunk-inspired with glowing effects
- **Fonts**: Orbitron, Exo 2, Audiowide
- **Effects**: Glow and pulse effects, no bounce
- **Best for**: Tech streams, electronic music

### 🕹️ Retro
- **Style**: 80s-inspired with warm colors
- **Fonts**: Press Start 2P, VT323
- **Effects**: Retro animations and styling
- **Best for**: Retro gaming, nostalgic content

### 🎩 Elegant
- **Style**: Sophisticated with elegant typography
- **Fonts**: Playfair Display, Source Sans Pro
- **Effects**: Subtle pulse effects only
- **Best for**: Music streams, artistic content

## Profile Configuration

### Colors
Each profile defines colors for different elements:
- `titleColor`: Song title text color
- `artistColor`: Artist name text color
- `requesterColor`: Requester name text color
- `positionColor`: Queue position text color
- `primary`, `secondary`, `accent`: Supporting colors

### Fonts
Three font categories are used:
- `primary`: Main text (titles, artists)
- `secondary`: Secondary text (position, info panels)
- `accent`: Special text elements

### Effects
Control various visual effects:
- `animations`: Enable/disable all animations
- `flipBoard`: Airport-style flip transitions
- `glow`: Glowing text effects
- `bounce`: Bouncing animations
- `pulse`: Pulsing effects
- `shimmer`: Color-shifting effects
- `sparkles`: Decorative sparkle effects

### Layout
Customize sizing and visual elements:
- `titleSize`, `artistSize`, etc.: Font sizes
- `borders`: Show/hide borders
- `shadows`: Enable/disable text shadows
- `spacing`: Layout spacing style

### Background
Background styling options:
- `gradients`: Use gradient backgrounds
- `patterns`: Show background patterns
- `animation`: Animate background elements

## Creating Custom Profiles

### Method 1: Using profile-config.js

1. Open `profile-config.js` in a text editor
2. Add your custom profile to the `userProfiles` object:

```javascript
const userProfiles = {
    myCustomProfile: {
        name: "My Custom Style",
        description: "A profile tailored to my stream",
        fonts: {
            primary: "'Your Font', sans-serif",
            secondary: "'Another Font', sans-serif",
            accent: "'Accent Font', sans-serif"
        },
        colors: {
            titleColor: "#YOUR_COLOR",
            artistColor: "#YOUR_COLOR",
            // ... more colors
        },
        effects: {
            animations: true,
            glow: false,
            // ... more effects
        },
        // ... layout and background settings
    }
};
```

3. Save the file and refresh your overlay

### Method 2: Modifying Existing Profiles

You can override specific settings of existing profiles:

```javascript
const profileOverrides = {
    superhero: {
        colors: {
            titleColor: "#FF0000"  // Make titles red
        },
        effects: {
            bounce: false  // Disable bouncing
        }
    }
};
```

## Using Profiles in OBS

1. **Set up Browser Source**: 
   - Width: 1024
   - Height: 768
   - URL: Point to your `queue.html` file

2. **Select Profile**: 
   - Open `profile-selector.html`
   - Choose and apply your desired profile
   - The overlay will automatically update

3. **Profile Persistence**: 
   - Selected profiles are saved automatically
   - They will persist across browser restarts

## Keyboard Shortcuts

- **Ctrl+P**: Open profile selector (when overlay is focused)
- **1-5**: Quick select profiles in selector
- **Enter**: Apply selected profile
- **Escape**: Reset to default profile

## Advanced Customization

### CSS Variables

The profile system uses CSS variables that you can override:

```css
:root {
    --title-color: #YOUR_COLOR;
    --title-size: 72px;
    --animations-enabled: 1; /* 1 = enabled, 0 = disabled */
}
```

### Profile-Specific CSS

Add custom CSS for specific profiles:

```css
body.profile-myprofile .song-title {
    /* Custom styling for your profile */
    transform: rotate(5deg);
}
```

### Custom Animations

Create your own animations:

```css
@keyframes myCustomAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

body.profile-myprofile .song-title {
    animation: myCustomAnimation 2s infinite;
}
```

## Troubleshooting

### Profile Not Loading
- Check browser console for errors
- Ensure `profiles.js` is loaded before `streamersonglist.js`
- Verify profile configuration syntax

### Fonts Not Displaying
- Check internet connection (Google Fonts)
- Verify font names are correct
- Use fallback fonts: `'Your Font', Arial, sans-serif`

### Effects Not Working
- Check if effects are enabled in profile configuration
- Verify CSS variables are set correctly
- Some effects may not work in older browsers

### Performance Issues
- Disable heavy animations for better performance
- Use minimal profile for low-end systems
- Reduce animation frequency in CSS

## Best Practices

1. **Test Thoroughly**: Always test profiles with actual queue data
2. **Consider Readability**: Ensure text is readable against backgrounds
3. **Performance**: Disable unnecessary effects for smoother performance
4. **Backup**: Keep backups of custom profile configurations
5. **Consistency**: Maintain consistent styling across all elements

## Font Recommendations

### Gaming/Energetic
- Bangers, Bungee, Fredoka One
- Press Start 2P (retro gaming)

### Professional/Clean
- Roboto, Open Sans, Lato
- Source Sans Pro, Inter

### Artistic/Creative
- Playfair Display, Crimson Text
- Montserrat, Poppins

### Tech/Futuristic
- Orbitron, Exo 2, Audiowide
- Rajdhani, Electrolize

## Color Schemes

### High Contrast
- White text on dark backgrounds
- Bright accent colors (#FF6B35, #4CAF50)

### Monochromatic
- Single color with different shades
- Good for minimal designs

### Complementary
- Colors opposite on color wheel
- Creates vibrant, energetic feel

### Analogous
- Colors next to each other on color wheel
- Creates harmonious, calm feel

## Support

If you need help with the profile system:

1. Check this guide first
2. Look at existing profile examples
3. Test with the profile selector
4. Check browser console for errors
5. Refer to the main README.md for general setup

Remember: The profile system is designed to be flexible and powerful while remaining easy to use. Start with existing profiles and gradually customize them to match your stream's unique style!