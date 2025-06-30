# Multi-Line Information Layout Guide

## New Information Structure

The overlay now displays song information in a clear, hierarchical multi-line format:

### Line 1: Queue Position
```
POSITION 1/5
```
- **Font**: Fredoka One (rounded, friendly)
- **Size**: 48px
- **Color**: Gold (#FFD700) with orange/red shadows
- **Animation**: Continuous bounce with 2-second cycle
- **Visual**: Golden bottom border separator

### Line 2: Song Title
```
NEVER GONNA GIVE YOU UP
```
- **Font**: Bangers (comic book style)
- **Size**: 64px (largest text)
- **Color**: White with green/blue shadows
- **Animation**: Glow effect with enhanced shadows
- **Visual**: Left/right colored borders

### Line 3: Artist Name
```
BY RICK ASTLEY
```
- **Font**: Bangers (comic book style)
- **Size**: 48px
- **Color**: Orange (#FF6B35) with white/red shadows
- **Animation**: Pulse scaling with enhanced shadows
- **Visual**: Distinct color to separate from title

### Line 4: Requested By
```
REQUESTED BY VIEWER123
```
- **Font**: Fredoka One (rounded, friendly)
- **Size**: 36px
- **Color**: Purple (#9C27B0) with shimmer effect
- **Animation**: Color cycling through purple variations
- **Visual**: Credits the user who requested the song

## Visual Hierarchy

1. **Song Title** - Most prominent (largest, center focus)
2. **Queue Position** - Important status (bouncy, golden)
3. **Artist Name** - Secondary info (medium size, distinct color)
4. **Requested By** - Attribution (smallest, but still visible)

## Animation Timing

- **Position Bounce**: 2-second continuous cycle
- **Title Glow**: 3-second glow enhancement cycle
- **Artist Pulse**: 2.5-second scaling cycle
- **Requester Shimmer**: 4-second color cycling
- **Letter Flip**: 0.6-second individual letter animations
- **Container Flip**: 1-second enter, 0.8-second exit

## Empty Queue Display

When no songs are queued:
```
NO SONGS
QUEUE IS EMPTY
ADD SONGS TO GET STARTED!
```

## Responsive Behavior

The layout automatically scales on smaller screens:
- Position: 4vw
- Title: 5.5vw
- Artist: 4vw
- Requester: 3vw

## Color Scheme

- **Gold**: Queue position and accents
- **White**: Song titles (primary content)
- **Orange**: Artist names (secondary content)
- **Purple**: Requester attribution
- **Green/Blue**: Shadow effects and borders

This layout provides clear information hierarchy while maintaining the superhero comic book aesthetic with dynamic animations.