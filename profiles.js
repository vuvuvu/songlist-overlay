/**
 * Profile System for StreamerSongList Overlay
 * 
 * This file contains different styling and effect profiles that can be applied
 * to customize the appearance and behavior of the queue overlay.
 */

// Available profiles with their configurations
const profiles = {
    superhero: {
        name: "Superhero",
        description: "Comic book style with vibrant colors and dynamic effects",
        fonts: {
            primary: "'Bangers', 'Arial', sans-serif",
            secondary: "'Fredoka One', sans-serif",
            accent: "'Bungee', sans-serif"
        },
        colors: {
            primary: "#FFFFFF",
            secondary: "#FFD700",
            accent: "#FF6B35",
            background: "transparent",
            titleColor: "#FFFFFF",
            artistColor: "#FF6B35",
            requesterColor: "#9C27B0",
            positionColor: "#FFD700"
        },
        effects: {
            animations: true,
            flipBoard: true,
            glow: true,
            bounce: true,
            pulse: true,
            shimmer: true,
            sparkles: true
        },
        layout: {
            titleSize: "64px",
            artistSize: "48px",
            requesterSize: "36px",
            positionSize: "48px",
            spacing: "standard",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    minimal: {
        name: "Minimal",
        description: "Clean and simple design with subtle effects",
        fonts: {
            primary: "'Roboto', 'Arial', sans-serif",
            secondary: "'Roboto', sans-serif",
            accent: "'Roboto', sans-serif"
        },
        colors: {
            primary: "#FFFFFF",
            secondary: "#E0E0E0",
            accent: "#2196F3",
            background: "rgba(0, 0, 0, 0.8)",
            titleColor: "#FFFFFF",
            artistColor: "#E0E0E0",
            requesterColor: "#2196F3",
            positionColor: "#2196F3"
        },
        effects: {
            animations: false,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: false,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "48px",
            artistSize: "36px",
            requesterSize: "28px",
            positionSize: "32px",
            spacing: "compact",
            borders: false,
            shadows: false
        },
        background: {
            gradients: false,
            patterns: false,
            animation: false
        }
    },

    neon: {
        name: "Neon",
        description: "Cyberpunk-inspired with glowing neon effects",
        fonts: {
            primary: "'Orbitron', 'Arial', sans-serif",
            secondary: "'Exo 2', sans-serif",
            accent: "'Audiowide', sans-serif"
        },
        colors: {
            primary: "#00FFFF",
            secondary: "#FF00FF",
            accent: "#00FF00",
            background: "rgba(0, 0, 0, 0.9)",
            titleColor: "#00FFFF",
            artistColor: "#FF00FF",
            requesterColor: "#00FF00",
            positionColor: "#FFFF00"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: true,
            bounce: false,
            pulse: true,
            shimmer: true,
            sparkles: false
        },
        layout: {
            titleSize: "56px",
            artistSize: "42px",
            requesterSize: "32px",
            positionSize: "40px",
            spacing: "standard",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: true
        }
    },

    retro: {
        name: "Retro",
        description: "80s-inspired with warm colors and classic styling",
        fonts: {
            primary: "'Press Start 2P', monospace",
            secondary: "'VT323', monospace",
            accent: "'Courier New', monospace"
        },
        colors: {
            primary: "#FFE066",
            secondary: "#FF6B9D",
            accent: "#C44569",
            background: "rgba(20, 20, 20, 0.9)",
            titleColor: "#FFE066",
            artistColor: "#FF6B9D",
            requesterColor: "#C44569",
            positionColor: "#00D2D3"
        },
        effects: {
            animations: true,
            flipBoard: true,
            glow: true,
            bounce: true,
            pulse: false,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "42px",
            artistSize: "32px",
            requesterSize: "24px",
            positionSize: "36px",
            spacing: "retro",
            borders: true,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: true,
            animation: false
        }
    },

    elegant: {
        name: "Elegant",
        description: "Sophisticated design with elegant typography",
        fonts: {
            primary: "'Playfair Display', serif",
            secondary: "'Source Sans Pro', sans-serif",
            accent: "'Crimson Text', serif"
        },
        colors: {
            primary: "#F5F5F5",
            secondary: "#D4AF37",
            accent: "#8B4513",
            background: "rgba(0, 0, 0, 0.7)",
            titleColor: "#F5F5F5",
            artistColor: "#D4AF37",
            requesterColor: "#8B4513",
            positionColor: "#D4AF37"
        },
        effects: {
            animations: true,
            flipBoard: false,
            glow: false,
            bounce: false,
            pulse: true,
            shimmer: false,
            sparkles: false
        },
        layout: {
            titleSize: "52px",
            artistSize: "38px",
            requesterSize: "30px",
            positionSize: "36px",
            spacing: "elegant",
            borders: false,
            shadows: true
        },
        background: {
            gradients: true,
            patterns: false,
            animation: false
        }
    }
};

// Current active profile (default to superhero)
let currentProfile = 'superhero';

/**
 * Apply a profile to the overlay
 * @param {string} profileName - Name of the profile to apply
 */
function applyProfile(profileName) {
    if (!profiles[profileName]) {
        console.error(`Profile '${profileName}' not found`);
        return;
    }

    currentProfile = profileName;
    const profile = profiles[profileName];
    
    console.log(`Applying profile: ${profile.name}`);
    
    // Apply CSS variables for the profile
    applyCSSVariables(profile);
    
    // Apply profile-specific classes
    applyProfileClasses(profileName);
    
    // Load profile-specific fonts
    loadProfileFonts(profile);
    
    // Apply effects configuration
    applyEffectsConfiguration(profile);
    
    // Trigger a queue update to apply new styling
    if (typeof $("body").updateQueue === 'function') {
        $("body").updateQueue();
    }
}

/**
 * Apply CSS variables based on profile configuration
 * @param {Object} profile - Profile configuration object
 */
function applyCSSVariables(profile) {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--primary-color', profile.colors.primary);
    root.style.setProperty('--secondary-color', profile.colors.secondary);
    root.style.setProperty('--accent-color', profile.colors.accent);
    root.style.setProperty('--background-color', profile.colors.background);
    root.style.setProperty('--title-color', profile.colors.titleColor);
    root.style.setProperty('--artist-color', profile.colors.artistColor);
    root.style.setProperty('--requester-color', profile.colors.requesterColor);
    root.style.setProperty('--position-color', profile.colors.positionColor);
    
    // Apply font variables
    root.style.setProperty('--primary-font', profile.fonts.primary);
    root.style.setProperty('--secondary-font', profile.fonts.secondary);
    root.style.setProperty('--accent-font', profile.fonts.accent);
    
    // Apply layout variables
    root.style.setProperty('--title-size', profile.layout.titleSize);
    root.style.setProperty('--artist-size', profile.layout.artistSize);
    root.style.setProperty('--requester-size', profile.layout.requesterSize);
    root.style.setProperty('--position-size', profile.layout.positionSize);
}

/**
 * Apply profile-specific CSS classes
 * @param {string} profileName - Name of the profile
 */
function applyProfileClasses(profileName) {
    const body = document.body;
    
    // Remove existing profile classes
    Object.keys(profiles).forEach(name => {
        body.classList.remove(`profile-${name}`);
    });
    
    // Add new profile class
    body.classList.add(`profile-${profileName}`);
}

/**
 * Load fonts required by the profile
 * @param {Object} profile - Profile configuration object
 */
function loadProfileFonts(profile) {
    const fonts = [
        profile.fonts.primary,
        profile.fonts.secondary,
        profile.fonts.accent
    ];
    
    // Extract font family names and load them
    fonts.forEach(fontDeclaration => {
        const fontFamily = fontDeclaration.split(',')[0].replace(/['"]/g, '').trim();
        
        // Skip loading system fonts
        if (['Arial', 'sans-serif', 'serif', 'monospace', 'Courier New'].includes(fontFamily)) {
            return;
        }
        
        // Load Google Fonts
        loadGoogleFont(fontFamily);
    });
}

/**
 * Load a Google Font
 * @param {string} fontFamily - Font family name
 */
function loadGoogleFont(fontFamily) {
    const fontMap = {
        'Bangers': 'Bangers',
        'Fredoka One': 'Fredoka+One:wght@400',
        'Bungee': 'Bungee',
        'Orbitron': 'Orbitron:wght@400;700;900',
        'Exo 2': 'Exo+2:wght@400;700',
        'Audiowide': 'Audiowide',
        'Press Start 2P': 'Press+Start+2P',
        'VT323': 'VT323',
        'Playfair Display': 'Playfair+Display:wght@400;700',
        'Source Sans Pro': 'Source+Sans+Pro:wght@400;600',
        'Crimson Text': 'Crimson+Text:wght@400;600',
        'Roboto': 'Roboto:wght@400;500'
    };
    
    const googleFontName = fontMap[fontFamily];
    if (!googleFontName) return;
    
    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href*="${googleFontName}"]`);
    if (existingLink) return;
    
    // Create and append font link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}&display=swap`;
    document.head.appendChild(link);
}

/**
 * Apply effects configuration from profile
 * @param {Object} profile - Profile configuration object
 */
function applyEffectsConfiguration(profile) {
    const root = document.documentElement;
    
    // Set effect flags as CSS custom properties
    root.style.setProperty('--animations-enabled', profile.effects.animations ? '1' : '0');
    root.style.setProperty('--flipboard-enabled', profile.effects.flipBoard ? '1' : '0');
    root.style.setProperty('--glow-enabled', profile.effects.glow ? '1' : '0');
    root.style.setProperty('--bounce-enabled', profile.effects.bounce ? '1' : '0');
    root.style.setProperty('--pulse-enabled', profile.effects.pulse ? '1' : '0');
    root.style.setProperty('--shimmer-enabled', profile.effects.shimmer ? '1' : '0');
    root.style.setProperty('--sparkles-enabled', profile.effects.sparkles ? '1' : '0');
    
    // Set layout flags
    root.style.setProperty('--borders-enabled', profile.layout.borders ? '1' : '0');
    root.style.setProperty('--shadows-enabled', profile.layout.shadows ? '1' : '0');
    
    // Set background flags
    root.style.setProperty('--gradients-enabled', profile.background.gradients ? '1' : '0');
    root.style.setProperty('--patterns-enabled', profile.background.patterns ? '1' : '0');
    root.style.setProperty('--bg-animation-enabled', profile.background.animation ? '1' : '0');
}

/**
 * Get the current active profile
 * @returns {Object} Current profile configuration
 */
function getCurrentProfile() {
    return profiles[currentProfile];
}

/**
 * Get all available profiles
 * @returns {Object} All profiles
 */
function getAllProfiles() {
    return profiles;
}

/**
 * Get profile names
 * @returns {Array} Array of profile names
 */
function getProfileNames() {
    return Object.keys(profiles);
}

// Initialize with default profile when DOM is ready
$(document).ready(function() {
    // Apply default profile
    applyProfile(currentProfile);
});