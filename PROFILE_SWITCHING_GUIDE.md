# Profile Switching Guide

## 🎯 Quick Answer: How to Switch Profiles

### Method 1: Profile Switcher (Easiest)
1. Open `profile-switcher.html` in your browser
2. Click any profile button
3. Profile applies instantly and saves automatically

### Method 2: Full Profile Selector (Most Features)
1. Open `profile-selector.html` in your browser
2. Browse all profiles with previews
3. Click "Apply Selected Profile"

### Method 3: Keyboard Shortcuts (Fastest)
- Press `Ctrl+P` while overlay is focused to open selector
- Press `1-9` for quick profile switching
- Press `R` for random profile
- Press `Esc` to reset to default

### Method 4: Direct Integration
- Profiles automatically load from localStorage
- Changes persist across browser sessions
- No manual setup required

## 🔧 Fixed Issues

### ✅ Issue 1: "0 requests remaining" Display
**Problem**: Song limit showing "0 requests remaining" even when no limit is set

**Solution**: Modified the code to only show song limits when actually configured
```javascript
// Only show if there's actually a song limit configured
if (songLimit === 0) {
  $("#song-limit-display").hide();
  return;
}
```

**Result**: Song limit only appears when you have limits configured in StreamerSongList

### ✅ Issue 2: "Unknown" Requester Names
**Problem**: All songs showing "Requested by Unknown" instead of actual usernames

**Solution**: Enhanced requester name detection to try multiple data sources
```javascript
// Try multiple ways to get the requester name
let requestedBy = 'Unknown';
if (song.requests && song.requests.length > 0) {
  requestedBy = song.requests[0].name || song.requests[0].username || song.requests[0].displayName || 'Unknown';
} else if (song.requester) {
  requestedBy = song.requester.name || song.requester.username || song.requester.displayName || song.requester;
} else if (song.requestedBy) {
  requestedBy = song.requestedBy;
}
```

**Result**: Proper requester names should now display correctly

### ✅ Issue 3: Profile Switching Clarity
**Problem**: Users didn't know how to switch profiles

**Solution**: Created multiple switching methods and clear documentation

## 📋 Complete Profile Switching Methods

### 🎨 Visual Profile Selector (`profile-selector.html`)
**Best for**: First-time setup, exploring all options

**Features**:
- Visual preview of all 14 profiles
- Detailed descriptions and feature lists
- Live preview functionality
- Export/import capabilities
- Comprehensive profile information

**How to Use**:
1. Open `profile-selector.html`
2. Browse profile cards
3. Click on desired profile
4. Click "Apply Selected Profile"
5. Use "Preview Overlay" to see results

### ⚡ Quick Switcher (`profile-switcher.html`)
**Best for**: Quick changes during streaming

**Features**:
- Simple grid of all profiles
- One-click switching
- Current profile display
- Keyboard shortcuts
- Status feedback

**How to Use**:
1. Open `profile-switcher.html`
2. Click any profile button
3. Profile applies instantly
4. Changes save automatically

### 🧪 Profile Tester (`profile-tester.html`)
**Best for**: Testing and experimentation

**Features**:
- Real-time profile switching
- Effect controls
- Custom song testing
- Performance monitoring
- Advanced testing tools

**How to Use**:
1. Open `profile-tester.html`
2. Click profile buttons in control panel
3. Experiment with effects
4. Test with different songs
5. Monitor performance

### ⌨️ Keyboard Shortcuts
**Best for**: Power users and streamers

**Available Shortcuts**:
- `Ctrl+P`: Open profile selector (when overlay focused)
- `1-9`: Quick switch to profiles 1-9
- `R`: Random profile
- `Esc`: Reset to default (Superhero)

**How to Use**:
1. Focus on overlay window (`queue.html`)
2. Press keyboard shortcuts
3. Profile changes instantly

## 🔄 Profile Persistence

### Automatic Saving
- Selected profiles save to browser localStorage
- Persist across browser sessions
- No manual saving required
- Works across all switching methods

### Manual Profile Management
```javascript
// Save current profile
localStorage.setItem('selectedProfile', 'gaming');

// Load saved profile
const saved = localStorage.getItem('selectedProfile');

// Clear saved profile (reset to default)
localStorage.removeItem('selectedProfile');
```

## 🎯 Profile Recommendations

### By Content Type

**🎮 Gaming Streams**
- Primary: `gaming`, `superhero`, `neon`
- Quick switch: Press `6` for Gaming profile

**🎵 Music/DJ Streams**
- Primary: `music`, `synthwave`, `elegant`
- Quick switch: Press `7` for Music profile

**💬 Talk Shows/Chatting**
- Primary: `chatting`, `corporate`, `minimal`
- Quick switch: Press `8` for Chatting profile

**🎨 Creative/Art Streams**
- Primary: `kawaii`, `elegant`, `nature`
- Quick switch: Press `5` for Elegant profile

**👻 Horror Content**
- Primary: `horror`, `neon` (dark)
- Quick switch: Press `9` for Horror profile

**💼 Professional/Business**
- Primary: `corporate`, `minimal`, `elegant`
- Quick switch: Press `2` for Minimal profile

## 🛠️ Troubleshooting

### Profile Not Switching
**Symptoms**: Clicking profile buttons has no effect

**Solutions**:
1. Check browser console for JavaScript errors
2. Ensure internet connection for font loading
3. Refresh the page and try again
4. Clear browser cache if needed

**Check**:
```javascript
// Open browser console and check:
console.log(typeof applyProfile); // Should be "function"
console.log(typeof getAllProfiles); // Should be "function"
```

### Profiles Look Wrong
**Symptoms**: Colors or fonts don't match expected appearance

**Solutions**:
1. Wait a few seconds for Google Fonts to load
2. Check internet connection
3. Try a different browser
4. Verify monitor color settings

### Keyboard Shortcuts Not Working
**Symptoms**: Pressing Ctrl+P or number keys has no effect

**Solutions**:
1. Make sure overlay window (`queue.html`) is focused
2. Click on the overlay first, then try shortcuts
3. Check if other software is intercepting shortcuts
4. Try using the visual selectors instead

### Song Limit Still Showing
**Symptoms**: "0 requests remaining" still appears

**Solutions**:
1. Refresh the overlay page
2. Check StreamerSongList settings for song limits
3. Set `showSongLimit = 'no'` in `streamersonglist.js` to disable completely

### Requester Names Still "Unknown"
**Symptoms**: All songs show "Requested by Unknown"

**Solutions**:
1. Check if songs have actual requesters in StreamerSongList
2. Verify API is returning proper data
3. Test with songs that have known requesters
4. Check browser console for API errors

## 🔍 Debugging Profile Issues

### Check Profile System Status
```javascript
// In browser console:
console.log('Profiles loaded:', typeof profiles !== 'undefined');
console.log('Apply function:', typeof applyProfile !== 'undefined');
console.log('Current profile:', getCurrentProfile());
console.log('All profiles:', Object.keys(getAllProfiles()));
```

### Verify Profile Application
```javascript
// Check if profile is applied:
console.log('Body classes:', document.body.className);
console.log('CSS variables:', getComputedStyle(document.documentElement).getPropertyValue('--title-color'));
```

### Test Profile Switching
```javascript
// Manually switch profile:
applyProfile('gaming');
console.log('Switched to gaming profile');
```

## 📱 Mobile/Touch Support

### Touch-Friendly Interfaces
- All profile selectors work on tablets
- Large touch targets for easy selection
- Responsive design adapts to screen size

### Mobile Limitations
- Keyboard shortcuts not available on mobile
- Some fonts may load slower on mobile connections
- Performance may vary on older mobile devices

## 🎉 Success Indicators

### Profile Successfully Applied
- Visual appearance changes immediately
- Browser console shows "Applied [profile] profile"
- Current profile updates in selectors
- Settings persist after page refresh

### Profile System Working
- No JavaScript errors in console
- All 14 profiles available in selectors
- Fonts load properly (may take a few seconds)
- Smooth transitions between profiles

## 📞 Getting Help

If you're still having issues:

1. **Check the testing tools**: Use `profile-tester.html` to diagnose issues
2. **Review browser console**: Look for JavaScript errors
3. **Test different browsers**: Try Chrome, Firefox, Safari, Edge
4. **Verify files**: Ensure all profile files are in the correct location
5. **Check internet**: Some features require internet for fonts

The profile system is designed to be robust and user-friendly. Most issues can be resolved by refreshing the page or checking the browser console for specific error messages.